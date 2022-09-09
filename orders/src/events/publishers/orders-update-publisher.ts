import {
    Publisher,
    QueuesName,
    ExchangesName,
    OrderUpdatedEvent,
    ExchangeTypes,
    RoutingKeys,
} from '@vuongtruongnb/common'

export class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
    readonly exchange = ExchangesName.Orders
    readonly queue = QueuesName.orderUpdated_Noti
    readonly exchangeType = ExchangeTypes.Topic
    readonly routingKey = RoutingKeys.orderUpdatedAll
}
