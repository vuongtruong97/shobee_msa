import { Schema, Document, Model, model } from 'mongoose'
import { Password } from '../utils/password'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface UserAttrs {
    full_name?: string
    gender?: number
    birth_day?: string
    address?: {
        province?: object
        district?: object
        ward?: object
    }
    email: string
    email_verified?: boolean
    phone?: string
    phone_verified?: boolean
    password: string
    token?: string
    avatar_url?: string
    google_id?: string
    facebook_id?: string
    role?: string
    shop?: string
}

interface UserDoc extends Document {
    full_name: string
    gender: number
    birth_day: string
    address: {
        province: object
        district: object
        ward: object
    }
    email: string
    email_verified: boolean
    phone: string
    phone_verified: boolean
    password: string
    token: string
    avatar_url: string
    google_id: string
    facebook_id: string
    role: string
    shop: string
}

interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new Schema(
    {
        full_name: { type: String },
        gender: { type: Number },
        birth_day: { type: String },
        address: {
            province: Object,
            district: Object,
            ward: Object,
        },
        not_new_user: { type: Boolean },
        email: { type: String, required: true },
        email_verified: { type: Boolean },
        phone: { type: String },
        phone_verified: { type: Boolean },
        password: { type: String, select: false, required: true },
        token: { type: String },
        avatar_url: { type: String },
        google_id: { type: String },
        facebook_id: { type: String },
        role: { type: String, default: 'USER' },
        shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    }
    // { timestamps: true }
)

userSchema.plugin(updateIfCurrentPlugin)
userSchema.set('versionKey', 'version')

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

// pre middle ware
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const hashed = await Password.hashedPassword(this.get('password'))
        this.set('password', hashed)
    }
})

//custom toJSON method to hide secret data
userSchema.methods.toJSON = function () {
    const user = this
    //convert mongoose document to js object
    const publicProfile = user.toObject()

    publicProfile.id = publicProfile._id

    delete publicProfile._id
    delete publicProfile.password
    delete publicProfile.__v

    return publicProfile
}

const User = model<UserDoc, UserModel>('User', userSchema)

export { User }
