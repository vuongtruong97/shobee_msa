import {
    Consumer,
    ExchangesName,
    ExchangeTypes,
    ProductCreatedEvent,
    QueuesName,
    RoutingKeys,
} from '@vuongtruongnb/common'
import { ConsumeMessage, Channel } from 'amqplib'
import { Product } from '../../models/Product'

export class ProductCreatedConsumer extends Consumer<ProductCreatedEvent> {
    readonly exchange = ExchangesName.Products
    readonly exchangeType = ExchangeTypes.Topic
    readonly queue = QueuesName.productCreated_Order
    readonly routingKey = RoutingKeys.productCreatedAll

    async processMsg(
        data: ProductCreatedEvent['data'],
        msg: ConsumeMessage,
        channel: Channel
    ) {
        try {
            const {
                id,
                name,
                price,
                quantity,
                status,
                discount,
                shop,
                image_url,
                version,
            } = data

            const product = Product.build({
                id,
                name,
                price,
                quantity,

                status,
                discount,
                shop,
                image_url,
            })

            await product.save()

            channel.ack(msg)
        } catch (error) {
            channel.nack(msg)
            console.error(error)
        }
    }
}
