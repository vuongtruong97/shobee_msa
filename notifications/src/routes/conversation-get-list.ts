import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError } from '@vuongtruongnb/common'
import { Conversation } from '../models/Conversation'

const router = Router()
router.get(
    '/api/noti/conversations',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.user!
            const conversations = await Conversation.find({
                members: { $in: [id] },
            })

            res.send({ success: true, data: conversations })
        } catch (error) {
            next(error)
        }
    }
)

export { router as conversationList }
