import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    let PORT = 3000
    if (process.env.NODE_EVN === 'test') {
        PORT = 3002
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
        await mongoose.connect(`${process.env.MONGO_URI}/catalog`)

        console.log('Connected to catalog mongodb 😁')
        app.listen(PORT, () => {
            console.log(`Catalogs service run on port ${PORT} 😎`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
