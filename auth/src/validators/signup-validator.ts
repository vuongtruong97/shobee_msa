import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const signupValidator = [
    body('firstname')
        .optional({ nullable: true, checkFalsy: true })
        .trim()
        .escape()
        .isLength({ min: 2, max: 20 })
        .withMessage('FirstName dài từ 2 tới 20 ký tự')
        .bail(),
    body('lastname')
        .optional({ nullable: true, checkFalsy: true })
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('LastName dài từ 2 tới 20 ký tự')
        .bail(),
    body('email', 'Email không đúng định dạng').trim().isEmail().normalizeEmail().bail(),
    body('password')
        .trim()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/)
        .withMessage(
            'Mật khẩu dài từ 8 - 16 ký tự, ít nhất một chữ hoa một chữ thường và một số'
        ),
    validateRequest,
]
