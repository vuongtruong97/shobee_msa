import Queue from 'bull'
import { Shop } from '../models/Shop'

interface Data {
    product: { id: string; shop: string }
}

const productCreateQueue = new Queue<Data>('product.created', {
    redis: {
        host: 'redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11890,
        password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
    },
})

productCreateQueue.process(async (job) => {
    try {
    } catch (error) {
        console.log(error)
    }
})

export { productCreateQueue }
