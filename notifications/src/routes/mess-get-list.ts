import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError } from '@vuongtruongnb/common'
import { Message } from '../models/Message'

const router = Router()
router.get(
    '/api/noti/messages/:conversationId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId,
            })
            res.send({ success: true, data: messages })
        } catch (error) {
            next(error)
        }
    }
)

export { router as messList }
