import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@vuongtruongnb/common'

import { ProductCreate } from './routes/product-create'
import { ProductGetOneRouter } from './routes/product-get-one'
import { ProductTextSearchRouter } from './routes/product-search'

import { shopCreateRouter } from './routes/shop-create'

import { CartGetMiniRouter } from './routes/cart-mini'
import { CartGetDetailRouter } from './routes/cart-detail'
import { CartModifyRouter } from './routes/cart-modify'
import { CartDeleteRouter } from './routes/cart-delete'

const app = express()

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression({ level: 6 }))
app.set('trust proxy', true)
app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
        origin: [
            'http://shobee.local',
            'https://snobdev.online',
            'https://shobee.snobdev.online',
        ],
        credentials: true,
    })
)

app.use(ProductCreate)
app.use(ProductGetOneRouter)
app.use(ProductTextSearchRouter)

app.use(shopCreateRouter)

app.use(CartModifyRouter)
app.use(CartGetMiniRouter)
app.use(CartGetDetailRouter)
app.use(CartDeleteRouter)

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

export { app }
