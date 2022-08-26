import { NextFunction, Router, Request, Response } from 'express'
import { SortOrder } from 'mongoose'
import { Product } from '../models/Product'
import { redisClient } from '@vuongtruongnb/common'

type ProductSearchQuery = {
    category?: string
    minPrice?: string
    maxPrice?: string
    keyword?: string
    limit?: string
    shopId?: string
    order?: SortOrder
    sortBy: 'createdAt' | 'sold' | 'price'
    page?: string
}

type ProductSearchFilter = {
    $text?: { $search: string }
    category?: string
    shop?: string
    price?: {
        $gte?: number
        $lte?: number
    }
    rating?: {
        $eq: number
    }
    status?: 'OLD' | 'NEW'
}

const router = Router()

router.get(
    '/api/products/products/search',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                keyword,
                limit = 30,
                category,
                maxPrice,
                minPrice,
                shopId,
                order = 1,
                sortBy,
                page = 1,
            } = req.query as ProductSearchQuery

            const filter = {} as ProductSearchFilter
            const projection = {} as { score: { $meta: string } }
            const sort = {} as { [key: string]: any }
            const skip = (+page - 1) * +limit

            if (category) {
                filter.category = category
            }
            if (shopId) {
                filter.shop = shopId
            }
            if (keyword) {
                filter.$text = { $search: keyword }
                projection.score = {
                    $meta: 'textScore',
                }
                sort.score = { $meta: 'textScore' }
            }
            if (maxPrice) {
                filter.price = { $lte: +maxPrice }
            }
            if (minPrice) {
                filter.price = { $gte: +minPrice }
            }
            if (maxPrice && minPrice) {
                filter.price = { $gte: +minPrice, $lte: +maxPrice }
            }

            if (sortBy) {
                sort[sortBy] = order
            }

            // console.log(filter)
            // console.log(sort)

            const products = await Product.find(
                {
                    ...filter,
                },
                {
                    ...projection,
                }
            )
                .select('name price rating image_urls')
                .skip(skip)
                .sort(sort)
                .limit(+limit)
                .cache({ time: keyword ? 0 : 60 }) // cache without keyword search

            res.send({
                success: true,
                data: products || [],
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as ProductTextSearchRouter }
