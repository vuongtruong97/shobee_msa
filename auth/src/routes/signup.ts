import express, { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'
import { signupValidator } from '../validators/signup-validator'
import {
    validateRequest,
    BadRequestError,
    DatabaseConnectionError,
    Jsonwebtoken,
} from '@vuongtruongnb/common'

const router = express.Router()

router.post(
    '/api/users/signup',
    signupValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body

            const existingUser = await User.findOne({ email })

            if (existingUser) {
                throw new BadRequestError('Tài khoản đã tồn tại 😥')
            }

            const user = User.build({ email, password })

            const result = await user.save()

            if (!result) {
                console.log('Tạo người dùng thất bại')
                throw new DatabaseConnectionError()
            }

            //generate jwt
            const token = Jsonwebtoken.sign(
                {
                    id: result._id,
                    email: result.email,
                },
                { expiresIn: '2h' }
            )
            const refreshToken = Jsonwebtoken.sign(
                {
                    id: result._id,
                    email: result.email,
                },
                { expiresIn: '7d' }
            )
            res.status(201).send({
                success: true,
                message: 'Tạo tài khoản thành công',
                token,
                refreshToken,
                data: result,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as signupRouter }
