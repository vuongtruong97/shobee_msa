import { NextFunction, Router, Request, Response } from 'express'
import { Banner } from '../models/Banner'
import { NotFoundError } from '@vuongtruongnb/common'

const router = Router()

router.get(
    '/api/catalogs/banners/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params

            const banner = await Banner.findById(id)

            if (!banner) {
                throw new NotFoundError()
            }

            res.status(200).json({
                success: true,
                data: banner,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as bannerGetOne }
