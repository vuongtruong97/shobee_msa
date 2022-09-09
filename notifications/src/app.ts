import express, { Request, Response, NextFunction } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import EventEmitter from 'events'

import helmet from 'helmet'
import compression from 'compression'
import { json } from 'body-parser'
import { errorHandler, NotFoundError, isAuthenticated } from '@vuongtruongnb/common'
import { instrument } from '@socket.io/admin-ui'

import { conversationCreate } from './routes/conversation-create'
import { messageCreate } from './routes/message-create'
import { conversationList } from './routes/conversation-get-list'
import { messList } from './routes/mess-get-list'
import { notiGetListRouter } from './routes/notify-list'

const eventbus = new EventEmitter()

interface User {
    userId: string
    socketId: string
}

let users: User[] = [] // online users

const addUser = (userId: string, socketId: string) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId: User['socketId']) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId: User['userId']) => {
    return users.find((user) => user.userId === userId)
}

const app = express()

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['https://admin.socket.io', 'http://shobee.local'],
        credentials: true,
    },
})

instrument(io, {
    auth: false,
})

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

io.on('connection', (socket) => {
    console.log('socket connection established')
    console.log('users', users)

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
        console.log('users', users)
    })

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }, callback) => {
        const user = getUser(receiverId)
        if (user) {
            io.to(user.socketId).emit('getMessage', {
                sender: senderId,
                text,
                id: uuidv4(),
            })

            // emit new message event
            eventbus.emit('noti', {
                content: text,
                title: 'Tin nhắn mới',
                url: '',
                type: 'new-message',
                user_id: receiverId,
            })

            callback({
                status: 'ok',
            })
        }
    })

    //when disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected!')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})

// noti
eventbus.on('noti', (payload) => {
    const user = getUser(payload.user_id.toString())
    if (user) {
        io.to(user.socketId).emit('notification', {
            type: payload.type,
            title: payload.title,
            content: payload.content,
            url: '',
        })
    }

    console.log(payload)
})

app.use(isAuthenticated)
app.use(conversationCreate)
app.use(messageCreate)
app.use(conversationList)
app.use(messList)
app.use(notiGetListRouter)

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

export { server, eventbus }
