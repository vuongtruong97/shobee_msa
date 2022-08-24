import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const cartModifyValidator = [
    body('product_id')
        .notEmpty()
        .withMessage('Id sản phẩm là bắt buộc')
        .isMongoId()
        .withMessage('Id sản phẩm không hợp lệ'),
    body('shop_id')
        .notEmpty()
        .withMessage('Id cửa hàng là bắt buộc')
        .isMongoId()
        .withMessage('Id cửa hàng không hợp lệ'),
    body('quantity')
        .notEmpty()
        .withMessage('Số lượng sản phẩm là bắt buộc')
        .isInt()
        .withMessage('Số lượng sản phẩm không hợp lệ'),
    validateRequest,
]
