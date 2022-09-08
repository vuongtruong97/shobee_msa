import { Schema, Document, Model, model } from 'mongoose'

interface ConversationAttrs {
    members: string[]
}

interface ConversationDoc extends Document {
    members: string[]
}

interface ConversationModel extends Model<ConversationDoc> {
    build(attrs: ConversationAttrs): ConversationDoc
}

const conversationSchema = new Schema({
    members: [{ type: String }],
})

conversationSchema.statics.build = (attrs: ConversationAttrs) => {
    return new Conversation(attrs)
}

conversationSchema.methods.toJSON = function () {
    const self = this
    const newSelf = self.toObject()

    newSelf.id = newSelf._id

    delete newSelf._id

    return newSelf
}

const Conversation = model<ConversationDoc, ConversationModel>(
    'Conversation',
    conversationSchema
)

export { Conversation }
