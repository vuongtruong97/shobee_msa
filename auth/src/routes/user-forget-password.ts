import express, { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'
import { BadRequestError, isAuthenticated, NotFoundError } from '@vuongtruongnb/common'
import { updateValidator } from '../validators/update-user-validator'

const router = express.Router()

router.post(
    '/api/users/forgot',
    updateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                throw new NotFoundError()
            }

            //create otp

            // save otp to redis

            //send OTP

            res.json({
                success: true,
                message: 'Gửi OTP thành công, vui lòng kiểm tra email của bạn',
            })
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/api/users/reset',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, otp, password } = req.body

            // check otp exist

            // reset password

            res.json({
                success: true,
                message: 'Đổi mật khẩu thành công',
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as forgetPasswordRouter }
