import { NextFunction, Router, Request, Response } from 'express'
import { Banner } from '../models/Banner'
import { BadRequestError, isAuthenticated } from '@vuongtruongnb/common'
import { diskUpload } from '../services/uploadImage'
import { imageUploadQueue, QueueModel } from '../queues/image-upload-queue'
import { bannerCreateValidator } from '../validators/banner-create-validator'

const router = Router()

router.post(
    '/api/catalogs/banners',
    isAuthenticated,
    diskUpload.single('image'),
    bannerCreateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { space_key, url } = req.body
            const { file } = req

            if (!file) {
                throw new BadRequestError('Vui lòng chọn đúng ảnh và định dạng')
            }

            const banner = new Banner({ space_key, url })

            await banner.save()

            imageUploadQueue.add({
                id: banner.id,
                image_path: file.path,
                model: QueueModel.Banner,
            })

            res.status(200).json({
                success: true,
                message: 'Tạo banner thành công',
                data: banner,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as bannerCreate }
