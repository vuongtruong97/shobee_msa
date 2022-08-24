import { Schema, Document, Model, model, Query } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface ProductAttrs {
    id: string
    name: string
    price: number
    quantity: number
    status?: string
    discount?: string
    shop: string
    image_url: string
}

interface ProductDoc extends Document {
    id: string
    name: string
    price: number
    quantity: number
    status?: string
    discount?: string
    shop: string
    image_url: string
    version: number
}

interface ProductModel extends Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc
    findByIdAndPreVersion(args: {
        id: string
        version: number
    }): Promise<ProductDoc | null>
}

const productSchema = new Schema({
    name: { type: String, index: true },
    price: { type: Number, required: true },
    image_url: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    discount: String,
    shop: { type: Schema.Types.ObjectId },
})

productSchema.set('versionKey', 'version')
productSchema.plugin(updateIfCurrentPlugin)

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product({ _id: attrs.id, ...attrs })
}

productSchema.statics.findByIdAndPreVersion = async (args: {
    id: string
    version: number
}) => {
    return await Product.findOne({ _id: args.id, version: args.version - 1 })
}

productSchema.methods.toJSON = function () {
    const self = this
    const newSelf = self.toObject()

    newSelf.id = newSelf._id

    delete newSelf._id

    return newSelf
}

const Product = model<ProductDoc, ProductModel>('Product', productSchema)

export { Product }
