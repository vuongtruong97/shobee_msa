import { Router, Request, Response, NextFunction } from 'express'
import { ClientSession, startSession } from 'mongoose'
import { isAuthenticated, BadRequestError } from '@vuongtruongnb/common'
import { Order } from '../models/Order'
import { Product } from '../models/Product'

const router = Router()

router.get(
    '/api/orders/list/:id',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { limit = 10, sort = 'desc' } = req.query

            const orders = await Order.find({
                $or: [{ shop_id: id }, { buyer: id }],
            })
                .limit(+limit)
                .sort('asc')

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

export { router as orderGetList }
