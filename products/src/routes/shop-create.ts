import { Router, Request, Response, NextFunction } from 'express'
import { shopCreateValidator } from '../validators/shop-create-validator'
import { BadRequestError, isAuthenticated } from '@vuongtruongnb/common'
import { Shop } from '../models/Shop'

const router = Router()

router.post(
    '/api/products/shop',
    isAuthenticated,
    shopCreateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req
            const {
                shop_name,
                contact_name,
                contact_phone,
                contact_address,
                ward,
                province,
                district,
                category,
            } = req.body

            const isExist = await Shop.findOne({ shop_name })

            if (isExist) {
                throw new BadRequestError('Tên shop đã tồn tại')
            }

            const shop_contacts = {
                name: contact_name,
                address: {
                    detail: contact_address,
                    ward,
                    district,
                    province,
                },
                phones: [contact_phone],
            }

            const shop = Shop.build({
                category,
                shop_name,
                shop_contacts,
                shop_owner: user!.id,
            })
            await shop.save()

            res.status(200).json({
                success: true,
                message: 'Tạo shop thành công',
                data: shop,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as shopCreateRouter }
