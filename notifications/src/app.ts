import express, { Request, Response, NextFunction } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import helmet from 'helmet'
import compression from 'compression'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@vuongtruongnb/common'
import { instrument } from '@socket.io/admin-ui'

import { chatService } from './services/chat.service'

const app = express()

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['https://admin.socket.io', 'http://localhost:3000'],
        credentials: true,
    },
})

instrument(io, {
    auth: false,
})

global._io = io

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression({ level: 6 }))
app.set('trust proxy', true)
app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})

global._io.on('connection', chatService)

app.use(errorHandler)

export { app }
