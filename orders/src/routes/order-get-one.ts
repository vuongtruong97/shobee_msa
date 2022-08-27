import { Router, Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@vuongtruongnb/common'
import { Order } from '../models/Order'

const router = Router()

router.get('/api/orders/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await Order.findById(id)

        if (!result) {
            throw new NotFoundError()
        }

        res.send({
            success: true,
            data: result,
        })
    } catch (error: any) {
        console.log(error)
        next(error)
    }
})

export { router as orderGetOneRouter }
