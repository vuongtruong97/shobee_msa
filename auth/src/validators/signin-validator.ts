import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const signinValidator = [
    body('email', 'Email không đúng định dạng').trim().isEmail().normalizeEmail().bail(),
    body('password')
        .trim()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/)
        .withMessage(
            'Mật khẩu dài từ 8 - 16 ký tự, ít nhất một chữ hoa một chữ thường và một số'
        ),
    validateRequest,
]
