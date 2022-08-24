import { NextFunction, Router, Request, Response } from 'express'
import { Category } from '../models/Category'

const router = Router()

router.get(
    '/api/catalogs/categories',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit = 30, page = 1 } = req.query

            const skip = (+page - 1) * +limit

            const listCatePromise = Category.find()
                .skip(skip)
                .limit(+limit)

            const totalPromise = Category.countDocuments()

            const listCate = await listCatePromise
            const total = (await totalPromise) / +limit

            const data = listCate.length ? listCate : []

            res.send({ success: true, data, total })
        } catch (error) {
            next(error)
        }
    }
)

export { router as categoryGetListRouter }
