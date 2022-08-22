import { NextFunction, Router, Request, Response } from 'express'
import { Banner } from '../models/Banner'
import { NotFoundError } from '@vuongtruongnb/common'
import { deleteFileCloudinary } from '../services/uploadImage'

const router = Router()

router.delete(
    '/api/catalogs/banners/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params

            const result = await Banner.findByIdAndDelete(id)

            if (!result) {
                throw new NotFoundError()
            }

            await deleteFileCloudinary()

            res.status(200).json({
                success: true,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

export { router as bannerDeleteRouter }
