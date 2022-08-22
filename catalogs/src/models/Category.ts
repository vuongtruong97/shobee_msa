import { Schema, Document, Model, model, Query } from 'mongoose'
import slugify from 'slugify'

interface CateAttrs {
    name: string
    display_name: string
    image_url: string
    slug: string
}

interface CateDoc extends Document {
    name: string
    display_name: string
    image_url: string
    slug: string
}

interface CateModel extends Model<CateDoc> {
    build(attrs: CateAttrs): CateDoc
}

const cateSchema = new Schema({
    name: { type: String, required: true, index: true },
    display_name: { type: String },
    image_url: { type: String },
    slug: { type: String, index: true },
})

cateSchema.statics.build = (attrs: CateAttrs) => {
    return new Category(attrs)
}

cateSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
})

//create slug
cateSchema.pre<CateDoc>('save', function () {
    const category = this
    const slug = slugify(category.name, { lower: true })
    category.slug = slug
})
// update slug
// cateSchema.pre('findOneAndUpdate', function () {
//     const category = this.update
//     const slug = slugify(category.name, { lower: true })
//     category.slug = slug
// })

//custom toJSON method to hide secret data
cateSchema.methods.toJSON = function () {
    const catogory = this
    //convert mongoose document to js object
    const publicProfile = catogory.toObject()
    publicProfile.id = publicProfile._id
    delete publicProfile._id

    return publicProfile
}

const Category = model<CateDoc, CateModel>('Category', cateSchema)

export { Category }
