import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@vuongtruongnb/common'

import { orderCreateRouter } from './routes/order-create'
import { orderGetList } from './routes/order-get-list'

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
            'https://shobee.snobdev.online',
        ],
        credentials: true,
    })
)

app.use(orderCreateRouter)
app.use(orderGetList)

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

export { app }
