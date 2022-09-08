import { Schema, Document, Model, model } from 'mongoose'

interface MessageAttrs {
    conversationId: string
    sender: string
    text: string
}

interface MessageDoc extends Document {
    conversationId: string
    sender: string
    text: string
}

interface MessageModel extends Model<MessageDoc> {
    build(attrs: MessageAttrs): MessageDoc
}

const MessageSchema = new Schema(
    {
        conversationId: { type: String, required: true },
        sender: { type: String, required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
)

MessageSchema.statics.build = (attrs: MessageAttrs) => {
    return new Message(attrs)
}

MessageSchema.methods.toJSON = function () {
    const self = this
    const newSelf = self.toObject()

    newSelf.id = newSelf._id

    delete newSelf._id

    return newSelf
}

const Message = model<MessageDoc, MessageModel>('Message', MessageSchema)

export { Message }
