import { Schema, Document, Model, model } from 'mongoose'

interface ShopAttrs {
    shop_name: string
    shop_contacts: {
        name: string
        phones: string[]
        address: {
            detail: string
            ward: string
            district: string
            province: string
        }
    }
    shop_owner: string
    category: string
    follow_count?: number
    is_offical_shop?: boolean
    item_count?: number
    rating?: object
    status?: string
    image_url?: string
}

interface ShopDoc extends Document {
    shop_name: string
    shop_contacts: {
        name: string
        phones: string[]
        address: {
            detail: string
            ward: string
            district: string
            province: string
        }
    }
    shop_owner: string
    category: string
    follow_count?: number
    is_offical_shop?: boolean
    item_count?: number
    rating?: object
    status?: string
    image_url?: string
}

interface ShopModel extends Model<ShopDoc> {
    build(attrs: ShopAttrs): ShopDoc
}

const shopSchema = new Schema(
    {
        shop_name: { type: String, required: true },
        shop_contacts: {
            name: { type: String },
            phones: [{ type: String }],
            address: {
                detail: String,
                ward: String,
                district: String,
                province: String,
            },
        },
        shop_owner: String,
        category: String,
        follow_count: Number,
        is_offical_shop: Boolean,
        item_count: Number,
        rating: Schema.Types.ObjectId,
        status: String,
        image_url: String,
    },
    { timestamps: true }
)

shopSchema.statics.build = (attrs: ShopAttrs) => {
    return new Shop(attrs)
}

shopSchema.methods.toJSON = function () {
    const catogory = this
    const newShop = catogory.toObject()
    newShop.id = newShop._id
    delete newShop._id

    return newShop
}

const Shop = model<ShopDoc, ShopModel>('Shop', shopSchema)

export { Shop }
