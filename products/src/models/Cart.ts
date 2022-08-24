import { Schema, Document, Model, model } from 'mongoose'

interface CartAttrs {
    owner: string
    products: {
        id: string
        quantity: number
        shop_id: string
    }[]
    total_items: number
}

interface CartDoc extends Document {
    owner: string
    products: {
        id: string
        quantity: number
        shop_id: string
    }[]
    total_items: number
}

interface CartModel extends Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc
}

const cartSchema = new Schema(
    {
        owner: { type: String, required: true },
        products: {
            type: [
                {
                    id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                    quantity: { type: Number, min: 1 },
                    shop_id: { type: Schema.Types.ObjectId, required: true },
                },
            ],
            default: [],
        },
        total_items: { type: Number, default: 0, min: 0 },
    },
    { timestamps: true }
)

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs)
}

cartSchema.methods.toJSON = function () {
    const self = this
    const newCart = self.toObject()
    newCart.id = newCart._id
    delete newCart._id

    return newCart
}

const Cart = model<CartDoc, CartModel>('Cart', cartSchema)

export { Cart }
