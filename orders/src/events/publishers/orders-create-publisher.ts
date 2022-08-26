import {
    Publisher,
    QueuesName,
    ExchangesName,
    OrderCreatedEvent,
    ExchangeTypes,
    RoutingKeys,
} from '@vuongtruongnb/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly exchange = ExchangesName.Orders
    readonly queue = QueuesName.orderCreated_Product
    readonly exchangeType = ExchangeTypes.Topic
    readonly routingKey = RoutingKeys.orderCreatedAll
}
