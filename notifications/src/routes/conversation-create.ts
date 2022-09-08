import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError } from '@vuongtruongnb/common'
import { Conversation } from '../models/Conversation'

const router = Router()
router.post(
    '/api/noti/conversations',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { senderId, receiverId } = req.body
            const conv = Conversation.build({ members: [senderId, receiverId] })

            await conv.save()

            res.status(201).send({ success: true, data: conv })
        } catch (error) {
            next(error)
        }
    }
)

export { router as conversationCreate }
