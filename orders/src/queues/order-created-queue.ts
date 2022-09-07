import Queue from 'bull'
import { rabbitWrapper } from '../rabbitmq-wrapper'
import { OrderCreatedPublisher } from '../events/publishers/orders-create-publisher'

interface ProductsChangeData {
    products: { id: string; quantity: number }[]
    shops: string[]
    buyer: string
}

const orderCreatedInternalQueue = new Queue<ProductsChangeData>('order.created.product', {
    redis: {
        host: 'redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11890,
        password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
    },
})

orderCreatedInternalQueue.process(async (job) => {
    try {
        console.log('run order created queue')
        console.log(job.data)

        await new OrderCreatedPublisher(
            rabbitWrapper.channels.orderCreatedChannel
        ).publish({ products: job.data.products, shops: [], buyer: job.data.buyer })
    } catch (error) {
        console.log(error)
    }
})

export { ProductsChangeData, orderCreatedInternalQueue }
