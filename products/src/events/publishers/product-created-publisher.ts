import {
    Publisher,
    QueuesName,
    ExchangesName,
    ProductCreatedEvent,
    ExchangeTypes,
    RoutingKeys,
} from '@vuongtruongnb/common'

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
    readonly exchange = ExchangesName.Products
    readonly queue = QueuesName.productCreated_Order
    readonly exchangeType = ExchangeTypes.Topic
    readonly routingKey = RoutingKeys.productCreatedAll
}
