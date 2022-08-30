import { Schema, Document, Model, model } from 'mongoose'

enum RatingStar {
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
}

interface ReviewAttrs {
    user_id: string
    order_id: string
    product_id: string
    rating: RatingStar
    comment?: string
    image_urls?: string[]
    reply?: string
}

interface ReviewDoc extends Document {
    user_id: string
    order_id: string
    product_id: string
    rating: RatingStar
    comment?: string
    image_urls?: string[]
    reply?: string
}

interface ReviewModel extends Model<ReviewDoc> {
    build(attrs: ReviewAttrs): ReviewDoc
}

const reviewSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, required: true },
        product_id: { type: Schema.Types.ObjectId, required: true },
        rating: { type: Number, enum: [1, 2, 3, 4, 5] },
        comment: String,
        image_urls: [{ type: String }],
        reply: String,
    },
    { timestamps: true }
)

reviewSchema.statics.build = (attrs: ReviewAttrs) => {
    return new Review(attrs)
}

reviewSchema.methods.toJSON = function () {
    const self = this
    const newSelf = self.toObject()

    newSelf.id = newSelf._id

    delete newSelf._id

    return newSelf
}

const Review = model<ReviewDoc, ReviewModel>('Review', reviewSchema)

export { Review }
