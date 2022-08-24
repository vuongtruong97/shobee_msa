import { Router, Request, Response, NextFunction } from 'express'
import { ClientSession, startSession } from 'mongoose'
import { isAuthenticated, BadRequestError } from '@vuongtruongnb/common'
import { Order } from '../models/Order'
import { Product } from '../models/Product'

const router = Router()

router.get(
    '/api/orders/:id',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params

            const orders = await Order.find({ shop_id: id })

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
