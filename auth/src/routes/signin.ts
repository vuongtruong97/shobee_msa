import { NextFunction, Router, Request, Response } from 'express'
import { signinValidator } from '../validators/signin-validator'
import { User } from '../models/User'
import { BadRequestError, Jsonwebtoken, redisClient } from '@vuongtruongnb/common'
import { Password } from '../utils/password'

const router = Router()

router.post(
    '/api/users/signin',
    signinValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const loginFailedKey = `login_failed${ip}`

        try {
            const failedCount = (await redisClient.get(loginFailedKey)) || 0

            // if login failed over 5 times
            if (failedCount >= 5) {
                const ttl = await redisClient.ttl(loginFailedKey)
                throw new BadRequestError(
                    `Nhập sai mật khẩu quá 5 lần,thử lại sau ${ttl}s`
                )
            }

            const { email, password } = req.body
            const existedUser = await User.findOne({ email }).select('password')

            if (!existedUser) {
                await redisClient.incr(loginFailedKey) // increase failed 1
                await redisClient.expire(loginFailedKey, 120) // set NX  not working 😪
                throw new BadRequestError('Thông tin đăng nhập không chính xác !')
            }

            const isMatch = await Password.comparePassword(password, existedUser.password)
            if (!isMatch) {
                await redisClient.incr(loginFailedKey) // increase failed 1
                await redisClient.expire(loginFailedKey, 120) // set NX  not working 😪
                throw new BadRequestError('Thông tin đăng nhập không chính xác !')
            }

            //generate jwt
            const token = Jsonwebtoken.sign(
                {
                    id: existedUser._id,
                    email: existedUser.email,
                },
                { expiresIn: process.env.JWT_AT_EX }
            )
            const refreshToken = Jsonwebtoken.sign(
                {
                    id: existedUser._id,
                    email: existedUser.email,
                },
                { expiresIn: process.env.JWT_RT_EX }
            )

            res.send({
                success: true,
                message: 'Đăng nhập thành công',
                token,
                refreshToken,
                data: existedUser,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as signinRouter }
