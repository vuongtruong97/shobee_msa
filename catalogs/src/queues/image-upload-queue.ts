import Queue from 'bull'
import { uploadToCloudinary } from '../services/uploadImage'
import { Category } from '../models/Category'
import { Banner } from '../models/Banner'

enum QueueModel {
    Category = 'Category',
    Banner = 'Banner',
}

interface Data {
    id: string
    image_path: string
    model: QueueModel
}

const imageUploadQueue = new Queue<Data>('image.upload', {
    redis: {
        host: 'redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11890,
        password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
    },
})

imageUploadQueue.process(async (job) => {
    try {
        switch (job.data.model) {
            case QueueModel.Category:
                const result = await uploadToCloudinary(job.data.image_path, {
                    access_mode: 'public',
                    folder: 'categories',
                    format: 'webp',
                    transformation: { width: 250, height: 250 },
                })

                if (result) {
                    await Category.findByIdAndUpdate(job.data.id, {
                        image_url: result.url,
                    })
                    console.log('Update catagory image success', result.url)
                }
                break
            case QueueModel.Banner:
                const bannerResult = await uploadToCloudinary(job.data.image_path, {
                    access_mode: 'public',
                    folder: 'banners',
                    format: 'webp',
                    // transformation: { width: 250, height: 250 },
                })

                if (bannerResult) {
                    await Banner.findByIdAndUpdate(job.data.id, {
                        image_url: bannerResult.url,
                    })
                    console.log('Update banner image success', bannerResult.url)
                    console.log('Update banner image success', bannerResult)
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
