import {
    Consumer,
    ExchangesName,
    ExchangeTypes,
    ShopCreatedEvent,
    QueuesName,
    RoutingKeys,
    ROLES,
} from '@vuongtruongnb/common'
import { ConsumeMessage, Channel } from 'amqplib'
import { User } from '../../models/User'

export class ShopCreateConsummer extends Consumer<ShopCreatedEvent> {
    readonly exchange = ExchangesName.Shop
    readonly exchangeType = ExchangeTypes.Topic
    readonly queue = QueuesName.shopCreated_Auth
    readonly routingKey = RoutingKeys.shopCreateAll

    async processMsg(
        data: ShopCreatedEvent['data'],
        msg: ConsumeMessage,
        channel: Channel
    ) {
        try {
            const user = await User.findById(data.owner)
            if (!user) {
                throw new Error('User not found')
            }
            user.set({ shop: data.shop_id, role: ROLES.SELLER })
            await user.save()

            channel.ack(msg)
        } catch (error) {
            channel.nack(msg)
            console.error(error)
        }
    }
}
