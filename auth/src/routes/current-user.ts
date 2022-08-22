import { NextFunction, Router, Request, Response } from 'express'
import { isAuthenticated, NotFoundError } from '@vuongtruongnb/common'
import { User } from '../models/User'

const router = Router()

router.get(
    '/api/users/currentuser',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.url)
            console.log(req.method)
            const user = await User.findById(req.user?.id)
            if (!user) {
                throw new NotFoundError()
            }
            res.send({ success: true, data: user })
        } catch (error) {
            next(error)
        }
    }
)

export { router as currentuserRouter }
