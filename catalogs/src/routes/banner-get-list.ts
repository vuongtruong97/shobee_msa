import { NextFunction, Router, Request, Response } from 'express'
import { Banner } from '../models/Banner'
import { NotFoundError } from '@vuongtruongnb/common'

const router = Router()

router.get(
    '/api/catalogs/banners',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit = 5, page = 1 } = req.query

            const skip = (+page - 1) * +limit
            const banners = await Banner.find()
                .skip(skip)
                .limit(+limit)

            let data: any[]
            if (banners.length === 0) {
                data = []
            } else {
                data = banners
            }

            const total = (await Banner.countDocuments()) / +limit

            res.status(200).json({
                success: true,
                data: banners,
                total,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as bannerGetLitsRouter }
