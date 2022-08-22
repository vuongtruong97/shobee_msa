import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const bannerUpdateValidator = [
    body('space_key')
        .optional()
        .notEmpty()
        .withMessage('Vui lòng nhập banner space_key')
        .trim()
        .isLength({ min: 5, max: 155 })
        .withMessage('Banner space_key dài từ 5 đến 155 ký tự'),
    body('url').optional().notEmpty().withMessage('Vui lòng nhập banner url'),
    validateRequest,
]
