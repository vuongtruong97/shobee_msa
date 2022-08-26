import mongoose from 'mongoose'
import { connectRedis } from '@vuongtruongnb/common'
import { app } from './app'
import { rabbitWrapper } from './rabbitmq-wrapper'
import { ProductCreatedConsumer } from './events/consumers/order-create-consumer'

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
        await connectRedis()
        await mongoose.connect(`${process.env.MONGO_URI}/products`)
        console.log('Connected to products mongodb 😁')

        await rabbitWrapper.createConnection(process.env.RABBIT_URI + '?heartbeat=60')

        await new ProductCreatedConsumer(rabbitWrapper.consumerConnection).listen()

        app.listen(3000, () => {
            console.log('Products service run on port 3000 😎')
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
