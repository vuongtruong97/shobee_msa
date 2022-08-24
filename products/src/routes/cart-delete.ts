import { NextFunction, Router, Request, Response } from 'express'
import { NotFoundError, isAuthenticated, clearKey } from '@vuongtruongnb/common'
import { cartDeleteValidator } from '../validators/cart-delete-validator'
import { Cart } from '../models/Cart'

const router = Router()

router.delete(
    '/api/products/cart',
    isAuthenticated,
    cartDeleteValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.user!
            await clearKey(id)

            const { product_id } = req.body

            const cart = await Cart.findOne({ owner: id })

            if (!cart) {
                throw new NotFoundError()
            }

            const productIndex = cart.products.findIndex(
                (product) => product.id.toString() == product_id
            )

            if (productIndex > -1) {
                cart.products.splice(productIndex, 1)
                cart.total_items -= 1
            }

            if (productIndex === -1) {
                throw new NotFoundError()
            }

            await cart.save()

            res.send({
                success: true,
                data: cart,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as CartDeleteRouter }
