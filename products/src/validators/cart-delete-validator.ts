import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const cartDeleteValidator = [
    body('product_id')
        .notEmpty()
        .withMessage('Id sản phẩm là bắt buộc')
        .isMongoId()
        .withMessage('Id sản phẩm không hợp lệ'),
    validateRequest,
]
