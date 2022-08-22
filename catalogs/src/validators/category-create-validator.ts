import { body } from 'express-validator'
import { validateRequest } from '@vuongtruongnb/common'

export const categoryCreateValidator = [
    body('name')
        .notEmpty()
        .withMessage('Vui lòng nhâp tên danh mục')
        .trim()
        .isLength({ min: 5, max: 155 })
        .withMessage('Tên danh mục dài từ 5 đến 155 ký tự'),
    body('display_name')
        .notEmpty()
        .withMessage('Vui lòng nhâp tên hiển thị danh mục')
        .trim()
        .isLength({ min: 5, max: 155 })
        .withMessage('Tên hiển thị từ 5 đến 155 ký tự'),
    validateRequest,
]
