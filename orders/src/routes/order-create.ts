import { Router, Request, Response, NextFunction } from 'express'
import { isAuthenticated, BadRequestError } from '@vuongtruongnb/common'
import { Order } from '../models/Order'
import { Product } from '../models/Product'
import { bulkTransactionWithRetry } from '../utils/bulkTransactionWithRetry'
import {
    orderCreatedInternalQueue,
    ProductsChangeData,
} from '../queues/order-created-queue'

const router = Router()

router.post(
    '/api/orders',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        const { list_order } = req.body
        const prod_change_info: ProductsChangeData['products'] = []
        const shop_has_orders: ProductsChangeData['shops'] = []

        try {
            await bulkTransactionWithRetry(async (session) => {
                await Order.create(list_order, { session, new: true })

                await Promise.all(
                    list_order.map(async (order: any) => {
                        shop_has_orders.push(order.shop_id)
                        await Promise.all(
                            order.products.map(async (product: any) => {
                                prod_change_info.push({
                                    id: product.id,
                                    quantity: product.quantity,
                                })
                                const prod = await Product.findByIdAndUpdate(
                                    product.id,
                                    {
                                        $inc: { quantity: -product.quantity },
                                    },
                                    { session, new: true }
                                )
                                if (!prod) {
                                    throw new BadRequestError(
                                        `Cập nhật số lượng sản phẩm thất bại, thử lại sau`
                                    )
                                }
                                if (prod.quantity < 0) {
                                    throw new BadRequestError(
                                        `Sản phẩm :[${prod.name}] không đủ số lượng`
                                    )
                                }
                                return prod
                            })
                        )
                    })
                )
            }, 5)

            // success transaction

            await orderCreatedInternalQueue.add({
                products: prod_change_info,
                shops: shop_has_orders,
            })

            res.status(202).send({
                success: true,
                message: 'Đơn hàng tạo thành công và đang chờ người bán xác nhận',
            })
        } catch (error: any) {
            console.log(error)
            next(error)
        }
    }
)

export { router as orderCreateRouter }
