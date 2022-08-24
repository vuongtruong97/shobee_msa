import * as http from 'http'
import mongoose from 'mongoose'
import { app } from './app'
import { connectRedis } from '@vuongtruongnb/common'
import { rabbitWrapper } from './rabbitmq-wrapper'
import { ShopCreateConsummer } from './events/consumers/shop-create-consumer'

let server: http.Server

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not define')
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not define')
    }

    if (!process.env.RABBIT_URI) {
        throw new Error('RABBIT_URI is not define')
    }
    try {
        await rabbitWrapper.createConnection(process.env.RABBIT_URI + '?heartbeat=60')

        await new ShopCreateConsummer(rabbitWrapper.consumerConnection).listen()

        await mongoose.connect(`${process.env.MONGO_URI}/auth`)

        await connectRedis()

        console.log('Connected to auth mongodb 😁')
        server = app.listen(3000, () => {
            console.log('Auth service run on port 3000 😎')
        })
    } catch (error: any) {
        console.log(error.message)
        console.log('Restarting server...')
        setTimeout(() => {
            start()
        }, 2000)
    }
}

start()

// graceful - shutdown
const shutdown = () => {
    console.info('SIGTERM signal received.')
    // Stop new requests from client
    console.log('Closing http server.')
    server.close(async () => {
        console.log('Http server closed.')
        // boolean means [force], see in mongoose doc
        mongoose.connection.close(false, () => {
            console.log('MongoDb connection closed.')
        })
        await rabbitWrapper.cancelConnection()
        // await RedisQuit()
        process.exit(0) // 0 mean exit with success code, 1 => failure code
    })
}
// process.on('SIGTERM', shutdown)
// process.on('SIGINT', shutdown)
