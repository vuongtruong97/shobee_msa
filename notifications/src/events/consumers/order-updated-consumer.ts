import {
    Consumer,
    ExchangesName,
    ExchangeTypes,
    OrderUpdatedEvent,
    QueuesName,
    RoutingKeys,
    OrderStatus,
} from '@vuongtruongnb/common'
import { ConsumeMessage, Channel } from 'amqplib'
import { Notify } from '../../models/Notify'
import { eventbus } from '../../app'

export class OrderUpdatedConsumer extends Consumer<OrderUpdatedEvent> {
    readonly exchange = ExchangesName.Orders
    readonly exchangeType = ExchangeTypes.Topic
    readonly queue = QueuesName.orderUpdated_Noti
    readonly routingKey = RoutingKeys.orderUpdatedAll

    async processMsg(
        data: OrderUpdatedEvent['data'],
        msg: ConsumeMessage,
        channel: Channel
    ) {
        try {
            let _content: string = ''
            switch (data.order_status) {
                case OrderStatus.CONFIRM:
                    _content = `Đơn hàng ${data.order_id} đã được người bán xác nhận`
                    break
                case OrderStatus.SHIPPING:
                    _content = `Đơn hàng ${data.order_id} đang được vận chuyển`
                    break
                case OrderStatus.COMPLETED:
                    _content = `Đơn hàng ${data.order_id} đã được giao thành công`
                    break
                case OrderStatus.REFUND:
                    _content = `Đơn hàng ${data.order_id} đã được hoàn trả`
                    break
            }

            const noti = Notify.build({
                user_id: data.buyer,
                content: _content,
                title: 'CẬP NHẬT ĐƠN HÀNG',
                type: 'ORDER',
            })

            await noti.save()

            eventbus.emit('noti', noti)
            channel.ack(msg)
        } catch (error) {
            channel.nack(msg)
            console.error(error)
        }
    }
}
