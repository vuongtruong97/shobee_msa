import { Schema, Document, Model, model } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface OrderAttrs {
    shop_id: string
    buyer: string
    products: {
        id: string
        quantity: number
    }[]
    product_count: number
    address: string
    status: string
    ship_info?: any
    payment_status?: boolean

    ship_payment: number
    merchandise_payment: number
    total_payment: number
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
    product_count: number
    address: string
    status: string
    ship_info?: any
    payment_status: boolean
    ship_payment: number
    merchandise_payment: number
    total_payment: number
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
    address: String,
    status: String,
    ship_info: String,
    payment_status: { type: Boolean, default: false },
    ship_payment: Number,
    merchandise_payment: Number,
    total_payment: Number,
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
