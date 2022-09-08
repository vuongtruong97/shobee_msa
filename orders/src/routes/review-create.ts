import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError, OrderStatus } from '@vuongtruongnb/common'
import { Order } from '../models/Order'
import { Review } from '../models/Review'
import { diskUpload } from '../utils/uploadImage'
import { reviewCreateValidator } from '../validators/review-create-validator'
import { uploadToCloudinary } from '../utils/uploadImage'

const router = Router()

router.post(
    '/api/orders/reviews',
    diskUpload.fields([{ name: 'images', maxCount: 6 }]),
    reviewCreateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { products_id, order_id, rating, comment } = req.body
            const { id } = req.user!
            const { files } = req
            let review: any

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

            const order = await Order.findById(order_id)

            if (!order) {
                throw new NotFoundError()
            }

            if (order.buyer.toString() !== req.user!.id) {
                throw new BadRequestError('Bạn không thể đánh giá sản phẩm này')
            }

            // @ts-ignore:next-line
            if (files['images']) {
                const resUrls = await Promise.all(
                    // @ts-ignore:next-line
                    files['images'].map(async (file: Express.Multer.File) => {
                        return await uploadToCloudinary(file.path, {
                            access_mode: 'public',
                            folder: 'reviews',
                            format: 'webp',
                            transformation: { width: 200, height: 200, crop: 'fill' },
                        })
                    })
                )

                const urls = resUrls.map((url: any) => url.url)

                review = Review.build({
                    products_id: JSON.parse(products_id),
                    user_id: id,
                    rating: +rating,
                    comment,
                    order_id,
                    image_urls: urls,
                })
            } else {
                review = Review.build({
                    products_id: JSON.parse(products_id),
                    user_id: id,
                    rating: +rating,
                    comment,
                    order_id,
                })
            }

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
