import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { rabbitWrapper } from './rabbitmq-wrapper'
import { OrderUpdatedConsumer } from './events/consumers/order-updated-consumer'
import { connectRedis } from '@vuongtruongnb/common'

import { server } from './app'

const start = async () => {
    let PORT = 3000
    if (process.env.NODE_ENV === 'test') {
        PORT = 3006
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
        await connectRedis()

        await mongoose.connect(`${process.env.MONGO_URI}/noti`)

        await rabbitWrapper.createConnection(process.env.RABBIT_URI + '?heartbeat=60')

        await new OrderUpdatedConsumer(rabbitWrapper.consumerConnection).listen()

        console.log('Connected to catalog mongodb 😁')
        server.listen(PORT, () => {
            console.log('Noti service run on port 3000 😎', PORT)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
