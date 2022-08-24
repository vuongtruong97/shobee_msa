import Queue from 'bull'
import { uploadToCloudinary } from '../utils/uploadImage'
import { Product } from '../models/Product'
import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher'
import { rabbitWrapper } from '../rabbitmq-wrapper'

enum QueueModel {
    Product = 'Product',
}

interface Data {
    id: string
    image_paths: string[]
    model: QueueModel
}

const imageUploadQueue = new Queue<Data>('product.image.upload', {
    redis: {
        host: 'redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11890,
        password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
    },
})

imageUploadQueue.process(async (job) => {
    try {
        console.log(job.data.model)
        switch (job.data.model) {
            case QueueModel.Product:
                const listResult = await Promise.all(
                    job.data.image_paths.map(async (path) => {
                        return await uploadToCloudinary(path, {
                            access_mode: 'public',
                            folder: 'products',
                            format: 'webp',
                            transformation: { width: 250, height: 250 },
                        })
                    })
                )

                const list_url = listResult.reduce((acc: string[], result) => {
                    if (result?.url) {
                        acc.push(result.url)
                    }
                    return acc
                }, [])

                if (list_url.length > 0) {
                    const product = await Product.findByIdAndUpdate(
                        job.data.id,
                        { image_urls: list_url },
                        { new: true }
                    )

                    if (!product) {
                        throw new Error('Cập nhật sản phẩm thất bại')
                    }

                    await new ProductCreatedPublisher(
                        rabbitWrapper.channels.productCreatedChannel
                    ).publish({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                        discount: product.discount,
                        shop: product.shop,
                        image_url: product.image_urls[0] || '',
                        version: product.version,
                        status: 'active',
                    })

                    console.log('Update product images success', list_url)
                }
                break

            default:
                console.log('Model not match')
        }
    } catch (error) {
        console.log(error)
    }
})

export { QueueModel, imageUploadQueue }
