import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const orderCancelValidator = [
    body('shop')
        .notEmpty()
        .withMessage('đã xảy ra lỗi,shop id là bắt buộc')
        .trim()
        .isLength({ min: 5, max: 155 })
        .withMessage('Tên hiển thị từ 5 đến 155 ký tự'),
    validateRequest,
]
