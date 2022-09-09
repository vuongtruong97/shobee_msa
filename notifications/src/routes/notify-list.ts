import { Router, Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError } from '@vuongtruongnb/common'
import { Notify } from '../models/Notify'

const router = Router()
router.get(
    '/api/noti/notifies',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit = '5' } = req.query
            const { id } = req.user!
            const notifies = await Notify.find({ user_id: id, unread: true })
                .limit(+limit)
                .sort('-createdAt')

            const totalNoti = await Notify.find({
                user_id: id,
                unread: true,
            }).countDocuments()

            res.status(201).send({
                success: true,
                data: notifies || [],
                total: totalNoti,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as notiGetListRouter }
