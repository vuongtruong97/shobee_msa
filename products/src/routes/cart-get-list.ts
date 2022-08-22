import { NextFunction, Router, Request, Response } from 'express'
import { NotFoundError, isAuthenticated } from '@vuongtruongnb/common'

const router = Router()

router.get(
    '/api/products/cart',
    isAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send({
                success: true,
                data: [{}],
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as CartGetListRouter }
