import { NextFunction, Router, Request, Response } from 'express'
import { isAuthenticated, NotFoundError } from '@vuongtruongnb/common'
import { User } from '../models/User'

const router = Router()

router.get(
    '/api/users/id/:id',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const user = await User.findById(id).populate('shop')
            if (!user) {
                throw new NotFoundError()
            }
            res.send({ success: true, data: user })
        } catch (error) {
            next(error)
        }
    }
)

export { router as userByIdRouter }
