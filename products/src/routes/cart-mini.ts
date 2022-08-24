import { NextFunction, Router, Request, Response } from 'express'
import { NotFoundError, isAuthenticated, clearKey } from '@vuongtruongnb/common'
import { Cart } from '../models/Cart'

const router = Router()

router.get(
    '/api/products/cart-mini',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.user!
            const { limit = 5 } = req.query

            // @ts-ignore
            const cart = await Cart.findOne({ owner: id })
                .populate({
                    path: 'products',
                    populate: {
                        path: 'id',
                        model: 'Product',
                        select: 'image_urls name price',
                    },
                })
                .slice('products', +limit)
                .cache({ time: 120, key: id })

            if (!cart) {
                await clearKey(id)
                console.log('Not found cart, create one')
                const cart = new Cart({ owner: id })
                await cart.save()
                return res.send({ success: true, data: cart })
            }

            res.send({
                success: true,
                data: cart,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

export { router as CartGetMiniRouter }
