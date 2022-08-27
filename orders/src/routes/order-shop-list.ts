import { Router, Request, Response, NextFunction } from 'express'
import { Order } from '../models/Order'
import { OrderStatus } from '@vuongtruongnb/common'

type OrderQuery = {
    sort?: string
    limit?: number
    status?: OrderStatus
}

interface OrderFilter {
    buyer: string
    status?: OrderStatus
}

const router = Router()

router.get(
    '/api/orders/shops/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { limit = 10, sort = 'desc', status } = req.query as OrderQuery

            const filter: OrderFilter = {
                buyer: req.user!.id,
            }

            if (status) {
                filter.status = status
            }

            const orders = await Order.find(filter)
                .limit(+limit)
                .sort(sort)

            res.send({
                success: true,
                data: orders,
            })
        } catch (error: any) {
            console.log(error)
            next(error)
        }
    }
)

export { router as orderShopRouter }
