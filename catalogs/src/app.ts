import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@vuongtruongnb/common'

import { categoryCreate } from './routes/category-create'
import { categoryUpdate } from './routes/category-update'
import { categoryGetOneRouter } from './routes/category-get-one'
import { categoryGetListRouter } from './routes/category-get-list'
import { categoryDeleteRouter } from './routes/category-delete'

import { bannerCreate } from './routes/banner-create'
import { bannerUpdate } from './routes/banner-update'
import { bannerGetOne } from './routes/banner-get-one'
import { bannerGetLitsRouter } from './routes/banner-get-list'
import { bannerDeleteRouter } from './routes/banner-delete'

const app = express()

app.use(morgan('combined'))
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

app.use(categoryCreate)
app.use(categoryUpdate)
app.use(categoryGetOneRouter)
app.use(categoryGetListRouter)
app.use(categoryDeleteRouter)

app.use(bannerCreate)
app.use(bannerUpdate)
app.use(bannerGetOne)
app.use(bannerGetLitsRouter)
app.use(bannerDeleteRouter)

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

export { app }
