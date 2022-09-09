import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError, redisClient } from '@vuongtruongnb/common'
import { Notify } from '../models/Notify'

const router = Router()
router.patch(
    '/api/noti/notifies/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await redisClient.del('unread_noti')
            const { id } = req.params

            const noti = await Notify.findById(id)

            if (!noti) {
                throw new NotFoundError()
            }

            noti.unread = false

            await noti.save()

            res.status(201).send({ success: true })
        } catch (error) {
            next(error)
        }
    }
)

export { router as messageCreate }
