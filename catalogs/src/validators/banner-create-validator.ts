import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const bannerCreateValidator = [
    body('space_key')
        .notEmpty()
        .withMessage('Vui lòng nhập banner space_key')
        .trim()
        .isLength({ min: 5, max: 155 })
        .withMessage('Banner space_key dài từ 5 đến 155 ký tự'),
    body('url').notEmpty().withMessage('Vui lòng nhập banner url'),
    validateRequest,
]
