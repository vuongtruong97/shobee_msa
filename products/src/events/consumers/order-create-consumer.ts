import {
    OrderCreatedEvent,
    Consumer,
    ExchangeTypes,
    RoutingKeys,
    QueuesName,
    ExchangesName,
    clearKey,
    NotFoundError,
} from '@vuongtruongnb/common'

import { Product } from '../../models/Product'
import { Cart } from '../../models/Cart'
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
            const cart = await Cart.findOne({ owner: data.buyer })
            if (!cart) {
                throw new NotFoundError()
            }

            await Promise.all(
                data.products.map(async (prod) => {
                    const productIndex = cart.products.findIndex(
                        (product) => product.id.toString() == prod.id
                    )
                    if (productIndex > -1) {
                        cart.products.splice(productIndex, 1)
                        cart.total_items -= 1
                    }

                    // if (productIndex === -1) {
                    //     throw new NotFoundError()
                    // }

                    return await Product.findByIdAndUpdate(prod.id, {
                        $inc: { quantity: -prod.quantity, sold: +prod.quantity },
                    })
                })
            )

            await cart.save()

            // invalidate products cache hash hey = collection name
            await clearKey('products')
            await clearKey(data.buyer)

            channel.ack(msg)
        } catch (error) {
            channel.nack(msg)
            console.error(error)
        }
    }
}
