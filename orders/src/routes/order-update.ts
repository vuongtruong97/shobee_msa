import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, OrderStatus } from '@vuongtruongnb/common'
import { Order } from '../models/Order'
import { orderUpdateValidator } from '../validators/order-update-validator'

const router = Router()

router.patch(
    '/api/orders/:id',
    orderUpdateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { status } = req.body
            const { id } = req.params

            if (!Object.values(OrderStatus).includes(status)) {
                throw new BadRequestError('Thông tin cập nhật không hợp lệ')
            }

            const result = await Order.findByIdAndUpdate(
                id,
                { status: status },
                { new: true }
            )

            if (!result) {
                throw new BadRequestError('Cập nhật trạng thái đơn hàng thất bại')
            }

            res.send({
                success: true,
                message: 'Cập nhật trạng thái đơn hàng thành công',
                data: result,
            })
        } catch (error: any) {
            console.log(error)
            next(error)
        }
    }
)

export { router as orderUpdateRouter }
