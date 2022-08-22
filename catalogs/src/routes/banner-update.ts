import { NextFunction, Router, Request, Response } from 'express'
import { Banner } from '../models/Banner'
import { BadRequestError, isAuthenticated } from '@vuongtruongnb/common'
import { diskUpload } from '../services/uploadImage'
import { imageUploadQueue, QueueModel } from '../queues/image-upload-queue'
import { bannerUpdateValidator } from '../validators/banner-update-validator'
import { removeUndefindedAttrs } from '../services/removeUndefindAttrs'

const router = Router()

router.patch(
    '/api/catalogs/banners/:id',
    isAuthenticated,
    diskUpload.single('image'),
    bannerUpdateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { space_key, url } = req.body
            const { file } = req
            const { id } = req.params

            if (file) {
                imageUploadQueue.add({
                    id: id,
                    image_path: file.path,
                    model: QueueModel.Banner,
                })
            }

            const newAttrs = {
                space_key,
                url,
            }

            removeUndefindedAttrs(newAttrs)

            await Banner.findByIdAndUpdate(id, { ...newAttrs })

            res.status(200).json({
                success: true,
                message: 'Cập nhật banner thành công, hình ảnh sẽ được xử lý sau ít phút',
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as bannerUpdate }
