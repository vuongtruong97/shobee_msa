import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectRedis } from '@vuongtruongnb/common'
import { rabbitWrapper } from './rabbitmq-wrapper'
import { app } from './app'
import { ProductCreatedConsumer } from './events/consumers/product-created-comsumer'

const start = async () => {
    let PORT = 3000
    if (process.env.NODE_EVN === 'test') {
        PORT = 3000
        dotenv.config()
    }

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

        await connectRedis()

        await mongoose.connect(`${process.env.MONGO_URI}/orders`)

        await new ProductCreatedConsumer(rabbitWrapper.consumerConnection).listen()

        console.log('Connected to orders mongodb 😁')
        app.listen(PORT, () => {
            console.log('orders service run on port 3000 😎', PORT)
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
