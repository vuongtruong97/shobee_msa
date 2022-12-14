import { Schema, Document, Model, model } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { OrderStatus } from '@vuongtruongnb/common'

interface OrderAttrs {
    shop_id: string
    buyer: string
    products: {
        id: string
        quantity: number
    }[]
    product_count?: number
    address: object
    status?: OrderStatus
    ship_info?: any
    payment_status?: boolean
    ship_payment?: number
    merchandise_payment?: number
    total_payment?: number
}

interface OrderDoc extends Document {
    shop_id: string
    buyer: string
    products: {
        id: string
        quantity: number
        name: string
        status: string
        price: number
    }[]
    product_count?: number
    address: string
    status: OrderStatus
    ship_info?: any
    payment_status: boolean
    ship_payment: number
    merchandise_payment: number
    total_payment: number
    isRated: boolean
}

interface OrderModel extends Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
}

const orderSchema = new Schema({
    shop_id: { type: Schema.Types.ObjectId, required: true },
    buyer: { type: Schema.Types.ObjectId, required: true },
    products: [
        {
            id: { type: Schema.Types.ObjectId, required: true },
            quantity: Number,
        },
    ],
    product_count: Number,
    address: {
        province: Object,
        district: Object,
        ward: Object,
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
    },
    ship_info: String,
    payment_status: { type: Boolean, default: false },
    ship_payment: Number,
    merchandise_payment: Number,
    total_payment: Number,
    isRated: { type: Boolean, default: false },
})

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs)
}

orderSchema.methods.toJSON = function () {
    const self = this
    const newSelf = self.toObject()

    newSelf.id = newSelf._id

    delete newSelf._id

    return newSelf
}

const Order = model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order }
