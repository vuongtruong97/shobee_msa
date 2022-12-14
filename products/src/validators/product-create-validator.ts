import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const productCreateValidator = [
    body('name')
        .notEmpty()
        .withMessage('Vui lòng nhập tên sản phẩm')
        .trim()
        .isLength({ min: 5, max: 155 })
        .withMessage('Tên sản phẩm dài từ 5 đến 155 ký tự'),
    body('description')
        .notEmpty()
        .withMessage('Vui lòng nhập mô tả sản phẩm')
        .trim()
        .isLength({ min: 55, max: 3555 })
        .withMessage('Mô tả sản phẩm từ 55 đến 3555 ký tự'),
    body('category')
        .notEmpty()
        .withMessage('Vui lòng chọn danh mục')
        .isMongoId()
        .withMessage('Id danh mục không đúng vui lòng kiểm tra lại'),
    body('price')
        .notEmpty()
        .withMessage('Vui lòng nhập giá sản phẩm')
        .isFloat({ min: 1 })
        .withMessage('Giá sản phẩm không hợp lệ'),
    body('quantity')
        .notEmpty()
        .withMessage('Vui lòng số lượng sản phẩm')
        .isFloat({ min: 1 })
        .withMessage('Số lượng sản phẩm không hợp lệ'),
    body('shop')
        .notEmpty()
        .withMessage('đã xảy ra lỗi,shop id là bắt buộc')
        .isMongoId()
        .withMessage('id cửa hàng không đúng vui lòng kiểm tra lại'),
    validateRequest,
]
