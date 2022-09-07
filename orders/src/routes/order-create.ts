import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError } from '@vuongtruongnb/common'
import { Order } from '../models/Order'
import { Product } from '../models/Product'
import { bulkTransactionWithRetry } from '../utils/bulkTransactionWithRetry'
import {
    orderCreatedInternalQueue,
    ProductsChangeData,
} from '../queues/order-created-queue'

const router = Router()

router.post('/api/orders', async (req: Request, res: Response, next: NextFunction) => {
    const { list_order, address } = req.body
    const { id } = req.user!
    const prod_change_info: ProductsChangeData['products'] = []
    const shop_has_orders: ProductsChangeData['shops'] = []

    console.log(list_order)
    console.log(list_order[0].products)

    const orders = list_order.map((order: any) => {
        return {
            shop_id: order.shop_id,
            products: order.products,
            address: address,
            buyer: id,
        }
    })

    try {
        await bulkTransactionWithRetry(async (session) => {
            await Order.create(orders, { session, new: true })

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
            buyer: id,
        })

        res.status(201).send({
            success: true,
            message: 'Đơn hàng tạo thành công và đang chờ người bán xác nhận',
        })
    } catch (error: any) {
        console.log(error)
        next(error)
    }
})

export { router as orderCreateRouter }
