import { NextFunction, Router, Request, Response } from 'express'
import { Category } from '../models/Category'
import { BadRequestError, isAuthenticated } from '@vuongtruongnb/common'
import { diskUpload } from '../services/uploadImage'
import { imageUploadQueue, QueueModel } from '../queues/image-upload-queue'
import { categoryCreateValidator } from '../validators/category-create-validator'

const router = Router()

router.post(
    '/api/catalogs/categories',
    isAuthenticated,
    diskUpload.single('image'),
    categoryCreateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, display_name } = req.body
            const { file } = req

            const isExist = await Category.findOne({ name })

            if (isExist) {
                throw new BadRequestError('Danh mục đã tồn tại')
            }

            if (!file) {
                throw new BadRequestError('Vui lòng chọn đúng ảnh và định dạng')
            }

            const category = new Category({ name, display_name })

            await category.save()

            imageUploadQueue.add({
                id: category.id,
                image_path: file.path,
                model: QueueModel.Category,
            })

            res.status(200).json({
                success: true,
                message: 'Tạo danh mục thành công',
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as categoryCreate }
