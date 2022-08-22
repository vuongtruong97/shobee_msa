import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const shopCreateValidator = [
    body('shop_name')
        .notEmpty()
        .withMessage('Vui lòng nhập tên cửa hàng')
        .trim()
        .isLength({ min: 2, max: 155 })
        .withMessage('Tên cửa hàng dài từ 2 đến 155 ký tự'),
    body('contact_name')
        .notEmpty()
        .withMessage('Vui lòng nhập tên liên hệ')
        .trim()
        .isLength({ min: 2, max: 155 })
        .withMessage('Tên liên hệ từ 2 đến 155 ký tự'),
    body('contact_phone')
        .notEmpty()
        .withMessage('Vui lòng nhập tên hiển thị danh mục')
        .trim()
        .isMobilePhone('vi-VN')
        .withMessage('Số điện thoại không hợp lệ'),
    body('contact_address')
        .notEmpty()
        .withMessage('Vui lòng nhập địa chỉ shop')
        .trim()
        .isLength({ min: 2, max: 155 })
        .withMessage('Địa chỉ shop dài từ 2 đến 155 ký tự'),
    body('ward')
        .optional()
        .trim()
        .isLength({ min: 2, max: 155 })
        .withMessage('Tên xã/phường từ 2 đến 55 ký tự'),
    body('province')
        .notEmpty()
        .withMessage('Vui lòng chọn tỉnh/thành phố')
        .isLength({ min: 2, max: 155 })
        .withMessage('Thông tin quận/huyện không đúng định dạng'),
    body('district')
        .optional()
        .isLength({ min: 2, max: 155 })
        .withMessage('Thông tin quận/huyện không đúng định dạng'),
    validateRequest,
]
