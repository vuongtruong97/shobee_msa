import {
    Publisher,
    QueuesName,
    ExchangesName,
    ProductCreatedEvent,
    ExchangeTypes,
    RoutingKeys,
} from '@vuongtruongnb/common'

export class ProductUpdatedPublisher extends Publisher<ProductCreatedEvent> {
    readonly exchange = ExchangesName.Products
    readonly queue = QueuesName.productUpdated_Order
    readonly exchangeType = ExchangeTypes.Topic
    readonly routingKey = RoutingKeys.productCreatedAll
}
