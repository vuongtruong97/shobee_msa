import { NextFunction, Router, Request, Response } from 'express'
import { Product } from '../models/Product'
import { BadRequestError, isAuthenticated, clearKey } from '@vuongtruongnb/common'
import { diskUpload } from '../utils/uploadImage'
import { imageUploadQueue, QueueModel } from '../queues/image-upload-queue'
import { productCreateValidator } from '../validators/product-create-validator'
// import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher'
// import { rabbitWrapper } from '../rabbitmq-wrapper'

const router = Router()

router.post(
    '/api/products/product',
    isAuthenticated,
    diskUpload.fields([{ name: 'list', maxCount: 4 }]),
    productCreateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description, category, price, quantity, invoice_option, shop } =
                req.body
            const { files } = req

            // @ts-ignore:next-line
            if (!files['list']) {
                throw new BadRequestError('Vui lòng chọn đúng ảnh và định dạng')
            }

            const isExistProduct = await Product.findOne({ name, shop })

            if (isExistProduct) {
                throw new BadRequestError('Sản phẩm đã tồn tại trong cửa hàng của bạn')
            }

            const product = Product.build({
                name,
                description,
                category,
                price,
                quantity,
                shop,
            })

            await product.save()

            await clearKey('products')

            imageUploadQueue.add({
                id: product.id,
                // @ts-ignore:next-line
                image_paths: files['list'].map((file: Express.Multer.File) => file.path),
                model: QueueModel.Product,
            })

            // await new ProductCreatedPublisher(
            //     rabbitWrapper.channels.productCreatedChannel
            // ).publish({
            //     id: product.id,
            //     name: product.name,
            //     price: product.price,
            //     quantity: product.quantity,
            //     discount: product.discount,
            //     shop: product.shop,
            //     image_url: product.image_urls[0] || '',
            //     version: product.version,
            //     status: 'active',
            // })

            res.status(200).json({
                success: true,
                message: 'Tạo Product thành công',
                // @ts-ignore:next-line
                data: product,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as ProductCreate }
