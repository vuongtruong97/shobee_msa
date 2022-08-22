import { NextFunction, Router, Request, Response } from 'express'
import { Category } from '../models/Category'
import { NotFoundError } from '@vuongtruongnb/common'

const router = Router()

router.get(
    '/api/catalogs/categories/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const cate = await Category.findById(id)

            if (!cate) {
                throw new NotFoundError()
            }

            res.send({ success: true, data: cate })
        } catch (error) {
            next(error)
        }
    }
)

export { router as categoryGetOneRouter }
