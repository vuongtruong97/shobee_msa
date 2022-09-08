import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError } from '@vuongtruongnb/common'
import { Message } from '../models/Message'

const router = Router()
router.post(
    '/api/noti/messages',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { sender, text, conversationId } = req.body
            const mess = Message.build({ sender, text, conversationId })

            await mess.save()

            res.status(201).send({ success: true, data: mess })
        } catch (error) {
            next(error)
        }
    }
)

export { router as messageCreate }
