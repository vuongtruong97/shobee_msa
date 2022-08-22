import { NextFunction, Router, Request, Response } from 'express'
import { isAuthenticated } from '@vuongtruongnb/common'

const router = Router()

router.post(
    '/api/users/signout',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send({ success: true })
        } catch (error) {
            next(error)
        }
    }
)

export { router as signoutRouter }
