import { Router, Request, Response, NextFunction } from 'express'
import { SortOrder } from 'mongoose'
import { NotFoundError } from '@vuongtruongnb/common'
import { Review } from '../models/Review'

type ProductSearchQuery = {
    rating: string
    sort_type: string
    filter_type: string
    order?: SortOrder
    product_id: string
    limit: string
    page?: string
}

type ReviewSearchFilter = {
    products_id?: string
    comment?: { $ne: null }
    image_urls?: { $exists: true; $not: { $size: 0 } }
    rating?: {
        $eq: number
    }
}

const router = Router()

router.get(
    '/api/orders/reviews/list',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                product_id,
                limit,
                rating,
                filter_type,
                page = '1',
                order,
                sort_type,
            } = req.query as ProductSearchQuery

            const filter = {} as ReviewSearchFilter
            const skip = (+page - 1) * +limit

            if (product_id) {
                filter.products_id = product_id
            }

            if (rating) {
                filter.rating = { $eq: +rating }
            }
            switch (filter_type) {
                case '0':
                    filter.comment = { $ne: null }
                    break
                case '1':
                    filter.image_urls = { $exists: true, $not: { $size: 0 } }
                    break
            }

            const reviews = await Review.find(filter)
                .skip(skip)
                .limit(+limit)

            const totals = await Review.find(filter).countDocuments()

            const pages = Math.ceil(totals / +limit)

            res.send({
                success: true,
                data: reviews || [],
                pages,
                totals: totals,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

export { router as reviewGetListRouter }
