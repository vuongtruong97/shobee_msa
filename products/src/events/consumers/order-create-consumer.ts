import {
    OrderCreatedEvent,
    Consumer,
    ExchangeTypes,
    RoutingKeys,
    QueuesName,
    ExchangesName,
    clearKey,
} from '@vuongtruongnb/common'

import { Product } from '../../models/Product'
import { ConsumeMessage, Channel } from 'amqplib'

export class ProductCreatedConsumer extends Consumer<OrderCreatedEvent> {
    readonly exchange = ExchangesName.Orders
    readonly exchangeType = ExchangeTypes.Topic
    readonly queue = QueuesName.orderCreated_Product
    readonly routingKey = RoutingKeys.orderCreatedAll

    async processMsg(
        data: OrderCreatedEvent['data'],
        msg: ConsumeMessage,
        channel: Channel
    ) {
        try {
            await Promise.all(
                data.products.map(async (prod) => {
                    return await Product.findByIdAndUpdate(prod.id, {
                        $inc: { quantity: -prod.quantity },
                    })
                })
            )

            // invalidate products cache hash hey = collection name
            await clearKey('products')

            channel.ack(msg)
        } catch (error) {
            channel.nack(msg)
            console.error(error)
        }
    }
}
