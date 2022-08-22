import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const updateValidator = [
    body('full_name')
        .optional({ nullable: true, checkFalsy: true })
        .trim()
        .isLength({ min: 5, max: 55 })
        .withMessage('Tên dài từ 5 đến 155 ký tự'),
    body('gender')
        .optional({ nullable: true, checkFalsy: true })
        .isFloat({ gt: -1, lt: 3 })
        .withMessage('Giới tính không đúng định dạng'),
    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .isMobilePhone('vi-VN')
        .withMessage('Số điện thoại không hợp lệ'),
    body('birth_day')
        .optional({ nullable: true, checkFalsy: true })
        .isString()
        .withMessage('Ngày sinh không đúng'),
    body('province')
        .optional({ nullable: true, checkFalsy: true })
        .isString()
        .withMessage('Tên Tỉnh/Thành phố không hợp lệ'),
    body('district')
        .optional({ nullable: true, checkFalsy: true })
        .isString()
        .withMessage('Tên Quận/Huyện không hợp lệ'),
    body('ward')
        .optional({ nullable: true, checkFalsy: true })
        .isString()
        .withMessage('Tên Xã/Phường không hợp lệ'),
    validateRequest,
]
