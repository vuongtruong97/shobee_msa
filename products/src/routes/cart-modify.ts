import { NextFunction, Router, Request, Response } from 'express'
import {
    NotFoundError,
    isAuthenticated,
    BadRequestError,
    clearKey,
} from '@vuongtruongnb/common'
import { cartModifyValidator } from '../validators/cart-modify-validator'
import { Cart } from '../models/Cart'
import { Product } from '../models/Product'

const router = Router()

router.post(
    '/api/products/cart',
    isAuthenticated,
    cartModifyValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.user!
            await clearKey(id)

            const { product_id, shop_id, quantity } = req.body

            const cart = await Cart.findOne({ owner: id })

            if (!cart) {
                throw new NotFoundError()
            }

            const productIndex = cart.products.findIndex(
                (product) => product.id == product_id
            )

            //----------------------------------------------------------------------//
            if (productIndex > -1) {
                const product = await Product.findById(product_id)
                if (!product) {
                    throw new NotFoundError()
                }
                const newQuantity = cart.products[productIndex].quantity + +quantity

                if (product.quantity < newQuantity) {
                    throw new BadRequestError(
                        `Chỉ còn ${product.quantity} sản phẩm cho mặt hàng này`
                    )
                }

                if (newQuantity > 0) {
                    cart.products[productIndex].quantity = newQuantity
                }
                if (newQuantity <= 0) {
                    cart.products.splice(productIndex, 1)
                    cart.total_items -= 1
                }
            }

            //----------------------------------------------------------------------//
            if (productIndex === -1 && +quantity < 0) {
                throw new BadRequestError('Yêu cầu không hợp lệ 😎')
            }

            //----------------------------------------------------------------------//
            if (productIndex === -1 && +quantity > 0) {
                cart.products.push({ id: product_id, shop_id, quantity })
                cart.total_items += 1
            }

            await cart.save()

            res.send({
                success: true,
                data: cart,
                message: 'Thêm sản phẩm vào giò hàng thành công',
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as CartModifyRouter }
