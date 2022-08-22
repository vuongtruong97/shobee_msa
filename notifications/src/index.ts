import mongoose from 'mongoose'

import { app } from './app'

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
        await mongoose.connect(`${process.env.MONGO_URI}/catalog`)

        console.log('Connected to catalog mongodb 😁')
        app.listen(3000, () => {
            console.log('Catalogs service run on port 3000 😎')
        })
    } catch (error) {
        console.log(error)
    }
}

start()
