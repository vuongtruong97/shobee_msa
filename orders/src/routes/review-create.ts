import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError, OrderStatus } from '@vuongtruongnb/common'
import { Order } from '../models/Order'
import { Review } from '../models/Review'
import { reviewCreateValidator } from '../validators/review-create-validator'

const router = Router()

router.post(
    '/api/orders/reviews',
    reviewCreateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { products_id, order_id, rating, comment } = req.body
            const { id } = req.user!

            const isRateable = await Order.findOne({
                _id: order_id,
                status: OrderStatus.COMPLETED,
                isRated: false,
            })
            if (!isRateable) {
                throw new BadRequestError(
                    'Không tìm thấy đơn hàng phù hợp với yêu cầu của bạn'
                )
            }

            // const existingReview = await Review.findOne({
            //     user_id: id,
            //     id: order_id,
            // })
            // if (existingReview) {
            //     throw new BadRequestError('Bạn đã đánh giá sản phẩm này')
            // }

            const order = await Order.findById(order_id)

            if (!order) {
                throw new NotFoundError()
            }

            if (order.buyer.toString() !== req.user!.id) {
                throw new BadRequestError('Bạn không thể đánh giá sản phẩm này')
            }

            // const orderHasProd = order.products.some(
            //     (prod) => prod.id.toString() === product_id.toString()
            // )

            // if (!orderHasProd) {
            //     throw new BadRequestError('Sản phẩm không có trong đơn hàng')
            // }

            const review = Review.build({
                products_id,
                user_id: id,
                rating: +rating,
                comment,
                order_id,
            })

            const updateOrder = await Order.findByIdAndUpdate(order_id, { isRated: true })
            if (!updateOrder) {
                throw new BadRequestError('Đã xảy ra lỗi, xin vui lòng thử lại sau')
            }

            await review.save()
            res.status(201).send({
                success: true,
                message: 'Cảm ơn quý khách đã đánh giá sản phẩm',
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as reviewCreateRouter }
