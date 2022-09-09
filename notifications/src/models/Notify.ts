import { Schema, Document, Model, model } from 'mongoose'

interface NotifyAttrs {
    user_id: string
    title: string
    content: string
    type?: string
    url?: string
}

interface NotifyDoc extends Document {
    user_id: string
    title: string
    content: string
    unread: boolean
    type: string
    url: string
}

interface NotifyModel extends Model<NotifyDoc> {
    build(attrs: NotifyAttrs): NotifyDoc
}

const notifySchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, required: true },
        title: String,
        content: String,
        unread: { type: Boolean, default: true },
        type: String,
        url: String,
    },
    { timestamps: true }
)

notifySchema.set('versionKey', 'version')

notifySchema.statics.build = (attrs: NotifyAttrs) => {
    return new Notify(attrs)
}

notifySchema.methods.toJSON = function () {
    const self = this
    const newSelf = self.toObject()

    newSelf.id = newSelf._id

    delete newSelf._id

    return newSelf
}

const Notify = model<NotifyDoc, NotifyModel>('Notify', notifySchema)

export { Notify }
