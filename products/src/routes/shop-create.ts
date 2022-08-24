import { Router, Request, Response, NextFunction } from 'express'
import { shopCreateValidator } from '../validators/shop-create-validator'
import { BadRequestError, isAuthenticated } from '@vuongtruongnb/common'
import { Shop } from '../models/Shop'
import { ShopCreatePublisher } from '../events/publishers/shop-create-publisher'
import { rabbitWrapper } from '../rabbitmq-wrapper'

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

            const userHasShop = await Shop.findOne({ owner: user!.id })

            if (userHasShop) {
                throw new BadRequestError('Mỗi tài khoản chỉ có thể tạo 1 cửa hàng')
            }

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

            await new ShopCreatePublisher(
                rabbitWrapper.channels.shopCreateChannel
            ).publish({
                owner: user!.id,
                shop_id: shop.id,
            })

            res.status(200).json({
                success: true,
                message:
                    'Tạo shop thành công, vui lòng đăng nhập lại để có thể truy cập trang quản lý cửa hàng',
                data: shop,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as shopCreateRouter }
