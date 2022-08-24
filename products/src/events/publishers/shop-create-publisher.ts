import {
    Publisher,
    QueuesName,
    ExchangesName,
    ShopCreatedEvent,
    ExchangeTypes,
    RoutingKeys,
} from '@vuongtruongnb/common'

export class ShopCreatePublisher extends Publisher<ShopCreatedEvent> {
    readonly exchange = ExchangesName.Shop
    readonly queue = QueuesName.shopCreated_Auth
    readonly exchangeType = ExchangeTypes.Topic
    readonly routingKey = RoutingKeys.shopCreateAll
}
