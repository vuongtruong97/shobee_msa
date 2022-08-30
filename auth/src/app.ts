import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import { json } from 'body-parser'
import { currentuserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { updateRouter } from './routes/update-user'
import { errorHandler, NotFoundError } from '@vuongtruongnb/common'

const app = express()

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression({ level: 6 }))
app.set('trust proxy', true)
app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
        origin: [
            'http://localhost:3007',
            'https://snobdev.online',
            'https://shobee.snobdev.online',
        ],
        credentials: true,
    })
)

app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(currentuserRouter)
app.use(updateRouter)

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

export { app }
