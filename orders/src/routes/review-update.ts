import { Router, Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@vuongtruongnb/common'
import { Review } from '../models/Review'

const router = Router()

router.patch(
    '/api/orders/reviews/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { reply } = req.body
            const { id } = req.params

            const review = await Review.findByIdAndUpdate(id, { reply })

            if (!review) {
                throw new NotFoundError()
            }

            await review.save()
            res.send({
                success: true,
                message: 'Phản hồi đánh giá thành công',
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

export { router as reviewUpdateRouter }
