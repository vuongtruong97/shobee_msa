import { NextFunction, Router, Request, Response } from 'express'
import { Category } from '../models/Category'
import { NotFoundError } from '@vuongtruongnb/common'

const router = Router()

router.delete(
    '/api/catalogs/categories/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const cate = await Category.findByIdAndDelete(id)

            if (!cate) {
                throw new NotFoundError()
            }

            res.send({ success: true })
        } catch (error) {
            next(error)
        }
    }
)

export { router as categoryDeleteRouter }
