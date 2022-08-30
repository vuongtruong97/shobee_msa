import { NextFunction, Router, Request, Response } from 'express'
import { Product } from '../models/Product'
import { NotFoundError } from '@vuongtruongnb/common'

const router = Router()

router.get(
    '/api/products/product/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const product = await Product.findById(id)
                .populate('shop')
                .cache({ time: 60 })

            if (!product) {
                throw new NotFoundError()
            }
            res.send({
                success: true,
                data: product,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as ProductGetOneRouter }
