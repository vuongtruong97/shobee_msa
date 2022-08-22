import { NextFunction, Router, Request, Response } from 'express'
import { Category } from '../models/Category'
import { BadRequestError, isAuthenticated } from '@vuongtruongnb/common'
import { diskUpload } from '../services/uploadImage'
import { imageUploadQueue, QueueModel } from '../queues/image-upload-queue'
import { categoryUpdateValidator } from '../validators/category-update-validator'
import { removeUndefindedAttrs } from '../services/removeUndefindAttrs'

const router = Router()

router.patch(
    '/api/catalogs/categories/:id',
    isAuthenticated,
    diskUpload.single('image'),
    categoryUpdateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { file } = req
            const { name, display_name } = req.body
            const { id } = req.params

            const isExist = await Category.findOne({ name })

            if (isExist && isExist.id !== id) {
                throw new BadRequestError('Tên danh mục đã tồn tại')
            }

            if (file) {
                imageUploadQueue.add({
                    id: id,
                    image_path: file.path,
                    model: QueueModel.Category,
                })
            }
            const newData = { name, display_name }

            removeUndefindedAttrs(newData)

            await Category.findByIdAndUpdate(id, newData)

            res.status(200).json({
                success: true,
                message: 'Cập nhật danh mục thành công',
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as categoryUpdate }
