import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError, OrderStatus } from '@vuongtruongnb/common'
import { Order } from '../models/Order'

const router = Router()

router.delete(
    '/api/orders/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params

            const order = await Order.findById(id)

            console.log(order)

            if (!order) {
                throw new NotFoundError()
            }

            if (order.buyer.toString() !== req.user!.id) {
                throw new BadRequestError('Huỷ đơn hàng thất bại 401')
            }

            if (order.status === OrderStatus.SHIPPING) {
                throw new BadRequestError(
                    'Đơn hàng đang trên đường vận chuyển, không thể huỷ'
                )
            }

            if (order.status === (OrderStatus.PENDING || OrderStatus.CONFIRM)) {
                order.status = OrderStatus.CANCELLED

                await order.save()

                return res.send({
                    success: true,
                    message: 'Huỷ đơn hàng thành công',
                })
            } else {
                throw new BadRequestError('Huỷ đơn hàng thất bại')
            }
        } catch (error: any) {
            console.log(error)
            next(error)
        }
    }
)

export { router as orderCancelledRouter }
