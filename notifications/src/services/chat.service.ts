import { Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import EventEmitter from 'events'

// @ts-ignore
const io = global._io

const eventbus = new EventEmitter()

interface User {
    userId: string
    socketId: string
}

let users: User[] = [] // online users

const addUser = (userId: User['userId'], socketId: User['socketId']) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId: User['socketId']) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId: User['userId']) => {
    return users.find((user) => user.userId === userId)
}

// socket handler
const chatService = (socket: Socket) => {
    console.log(`${socket.id} connected`)

    socket.on('addUser', (userId: User['userId']) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
        console.log('users', users)
    })

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }, callback) => {
        const user = getUser(receiverId)
        console.log(text)
        console.log(user)

        if (user) {
            io.to(user.socketId).emit('getMessage', {
                sender: senderId,
                text,
                _id: uuidv4(),
            })

            // emit new message event
            eventbus.emit('new-message', {
                text: text,
                url: '',
                sender: senderId,
                createdAt: Date.now(),
            })

            io.to(user.socketId).emit('notification', {
                type: 'new-message',
                title: 'Tin nhắn mới',
                text: text,
                url: '',
                sender: senderId,
                createdAt: Date.now(),
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

    // **************Noti***************** //
    socket.on('noti', (payload, cb) => {
        console.log(payload)
        console.log(cb)
        console.log('asdfasfsfsdf')
    })
}

export { chatService }
