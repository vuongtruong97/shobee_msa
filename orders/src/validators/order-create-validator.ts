import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const orderCreateValidator = [
    body('district')
        .optional()
        .isLength({ min: 2, max: 155 })
        .withMessage('Thông tin quận/huyện không đúng định dạng'),
    validateRequest,
]
