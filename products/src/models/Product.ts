import { Schema, Document, Model, model } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface ProductAttrs {
    name: string
    description: string
    guarantee?: string
    expiry?: string
    price: number
    quantity: number
    status?: string
    image_urls?: string[]
    video?: object
    currency?: string
    discount?: string
    shop: string
    brand?: string
    category: string
    sold?: number
    liked_count?: number
    specs?: object[]
    label_ids?: number[]
    invoice_option?: boolean
    rating?: {
        rating_count: number[]
        rating_star: number
    }
}

interface ProductDoc extends Document {
    name: string
    description: string
    guarantee?: string
    expiry?: string
    price: number
    quantity: number
    status?: string
    image_urls: string[]
    video?: object
    currency?: string
    discount?: string
    shop: string
    brand?: string
    category: string
    sold?: number
    liked_count?: number
    specs?: object[]
    label_ids: number[]
    invoice_option?: boolean
    rating?: {
        rating_count: number[]
        rating_star: number
    }
    version: number
}

interface ProductModel extends Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc
}

const productSchema = new Schema(
    {
        name: { type: String, index: true },
        description: { type: String, required: true },
        guarantee: String,
        expiry: String,
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        status: { type: String, enum: ['OLD', 'NEW'], default: 'NEW' },
        image_urls: [{ type: String }],
        video: { type: Object },
        currency: { type: String, default: 'VND' },
        discount: String,
        shop: { type: Schema.Types.ObjectId, required: true },
        brand: String,
        category: { type: Schema.Types.ObjectId, required: true },
        sold: Number,
        liked_count: Number,
        specs: [{ type: Object }],
        label_ids: [{ type: Number }],
        invoice_option: Boolean,
        rating: {
            rating_count: [{ type: Number }],
            rating_star: Number,
        },
    },
    { timestamps: true }
)

productSchema.index({ name: 'text' })
productSchema.set('versionKey', 'version')
productSchema.plugin(updateIfCurrentPlugin)

productSchema.methods.toJSON = function () {
    const self = this
    const newSelf = self.toObject()

    newSelf.id = newSelf._id

    delete newSelf._id

    return newSelf
}

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs)
}

const Product = model<ProductDoc, ProductModel>('Product', productSchema)

export { Product }
