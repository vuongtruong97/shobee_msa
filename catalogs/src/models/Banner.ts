import { Schema, Document, Model, model } from 'mongoose'

interface BannerAttrs {
    space_key: string
    image_url?: string
    image_hash?: string
    url: string
}

interface BannerDoc extends Document {
    space_key: string
    image_url: string
    image_hash: string
    url: string
}

interface BannerModel extends Model<BannerDoc> {
    build(attrs: BannerAttrs): BannerDoc
}

const bannerSchema = new Schema({
    space_key: { type: String, required: true },
    image_url: { type: String },
    image_hash: String,
    url: { type: String },
})

bannerSchema.statics.build = (attrs: BannerAttrs) => {
    return new Banner(attrs)
}

const Banner = model<BannerDoc, BannerModel>('Banner', bannerSchema)

export { Banner }
