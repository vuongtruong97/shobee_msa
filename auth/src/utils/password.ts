import { hash, genSalt, compare } from 'bcrypt'

export class Password {
    static async hashedPassword(password: string) {
        const saltRounds = 10
        const salt = await genSalt(saltRounds)
        const hashedPassword = await hash(password, salt)
        return hashedPassword
    }
    static async comparePassword(password: string, hashedPassword: string) {
        const isMatch = await compare(password, hashedPassword)
        return isMatch
    }
}
