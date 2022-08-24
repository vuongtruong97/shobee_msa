import { NextFunction, Router, Request, Response } from 'express'
import { Product } from '../models/Product'
import { NotFoundError } from '@vuongtruongnb/common'

const router = Router()

router.get(
    '/api/products/products',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const products = await Product.find({}).cache({ time: 60 })

            res.send({
                success: true,
                data: products,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as ProductGetListRouter }
