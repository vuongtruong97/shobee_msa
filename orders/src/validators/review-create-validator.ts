import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const reviewCreateValidator = [
    body('product_id')
        .notEmpty()
        .withMessage('Id sản phẩm là bắt buộc')
        .isMongoId()
        .withMessage('Id sản phẩm không đúng'),
    body('order_id')
        .notEmpty()
        .withMessage('Id đơn hàng là bắt buộc')
        .isMongoId()
        .withMessage('Id đơn hàng không đúng'),
    body('rating')
        .notEmpty()
        .withMessage('Mức độ đánh giá là bắt buộc')
        .isInt({ gt: 0, lt: 6 })
        .withMessage('Mức đánh giá từ 1 đến 5'),
    body('comment')
        .optional()
        .isLength({ min: 30, max: 255 })
        .withMessage('Bình luận sản phẩm dài từ 30 đến 255 ký tự'),
    validateRequest,
]
