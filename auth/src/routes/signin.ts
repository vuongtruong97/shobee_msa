import { NextFunction, Router, Request, Response } from 'express'
import { signinValidator } from '../validators/signin-validator'
import { User } from '../models/User'
import { BadRequestError, Jsonwebtoken } from '@vuongtruongnb/common'
import { Password } from '../utils/password'
import { redisClient } from '../utils/redis'

const router = Router()

router.post(
    '/api/users/signin',
    signinValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body

            const existedUser = await User.findOne({ email }).select('password')

            if (!existedUser) {
                throw new BadRequestError('Thông tin đăng nhập không chính xác !')
            }

            const isMatch = await Password.comparePassword(password, existedUser.password)

            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

            const failedCount = (await redisClient.get(`login_failed${ip}`)) || 0
            // if login failed over 5 times
            if (failedCount >= 5) {
                const ttl = await redisClient.ttl(`login_failed${ip}`)
                throw new BadRequestError(
                    `Nhập sai mật khẩu quá 5 lần,thừ lại sau ${ttl}s`
                )
            }

            if (!isMatch) {
                await redisClient.incr(`login_failed${ip}`) // increase failed 1
                await redisClient.expire(`login_failed${ip}`, 120) // set NX  not working 😪

                const ttl = await redisClient.ttl(`login_failed${ip}`)
                console.log(ttl)
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
