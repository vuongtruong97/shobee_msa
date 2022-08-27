import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const orderUpdateValidator = [
    body('status').notEmpty().withMessage('Trạng thái đơn hàng là bắt buộc'),
    validateRequest,
]
