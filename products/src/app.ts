import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@vuongtruongnb/common'

import { ProductCreate } from './routes/product-create'
import { ProductGetOneRouter } from './routes/product-get-one'
import { ProductGetListRouter } from './routes/product-get-list'

import { shopCreateRouter } from './routes/shop-create'

import { CartGetListRouter } from './routes/cart-get-list'

const app = express()

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression({ level: 6 }))
app.set('trust proxy', true)
app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://snobdev.online',
            'http://192.168.1.29',
            'https://shobee.snobdev.online',
        ],
        credentials: true,
    })
)

app.use(ProductCreate)
app.use(ProductGetOneRouter)
app.use(ProductGetListRouter)

app.use(shopCreateRouter)

app.use(CartGetListRouter)

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

export { app }
