import { Router, Request, Response, NextFunction } from 'express'
import { Order } from '../models/Order'
import { OrderStatus } from '@vuongtruongnb/common'

type OrderQuery = {
    sort?: string
    limit?: number
    status?: OrderStatus
}

interface OrderFilter {
    shop_id: string
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
                shop_id: id,
            }

            if (status) {
                filter.status = status
            }

            const orders = await Order.find(filter)
                .populate({
                    path: 'products',
                    populate: [
                        {
                            path: 'id',
                            model: 'Product',
                        },
                    ],
                })
                .limit(+limit)
                .sort(sort)

            res.send({
                success: true,
                data: orders || [],
            })
        } catch (error: any) {
            console.log(error)
            next(error)
        }
    }
)

export { router as orderShopRouter }
