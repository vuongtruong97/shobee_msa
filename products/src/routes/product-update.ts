import { NextFunction, Router, Request, Response } from 'express'
import { Product } from '../models/Product'
import { BadRequestError, isAuthenticated, NotFoundError } from '@vuongtruongnb/common'
import { diskUpload } from '../utils/uploadImage'
import { imageUploadQueue, QueueModel } from '../queues/image-upload-queue'
import { productCreateValidator } from '../validators/product-create-validator'
import { removeUndefindedAttrs } from '../utils/removeUndefindAttrs'

const router = Router()

router.post(
    '/api/products/product/:id',
    isAuthenticated,
    diskUpload.fields([{ name: 'list', maxCount: 4 }]),
    productCreateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.query

            const { name, description, category, price, quantity, invoice_option, shop } =
                req.body
            const { files } = req

            const product = await Product.findById(productId)

            if (!product) {
                throw new NotFoundError()
            }

            // @ts-ignore:next-line
            if (files['list']) {
                imageUploadQueue.add({
                    id: product.id,
                    // @ts-ignore:next-line
                    image_paths: files['list'].map(
                        (file: Express.Multer.File) => file.path
                    ),
                    model: QueueModel.Product,
                })
            }

            const newAttrs = {
                name,
                description,
                category,
                price,
                quantity,
                invoice_option,
                shop,
            }
            removeUndefindedAttrs(newAttrs)

            Object.assign(product, newAttrs)

            await product.save()

            res.status(200).json({
                success: true,
                message: 'Cập nhật thông tin sản phẩm thành công',
                data: product,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as ProductCreate }
