import Queue from 'bull'
import { uploadToCloudinary } from '../utils/uploadImage'
import { Category } from '../models/Category'

interface Data {
    id: string
    image_path: string
}

export const imageUploadQueue = new Queue<Data>('image.upload', {
    redis: {
        host: 'redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11890,
        password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
    },
})

imageUploadQueue.process(async (job) => {
    try {
        console.log(job.data, 'image.upload queue')

        const result = await uploadToCloudinary(job.data.image_path, {
            access_mode: 'public',
            folder: 'categories',
            format: 'webp',
            transformation: { width: 250, height: 250 },
        })
        if (result) {
            await Category.findByIdAndUpdate(job.data.id, { image_url: result.url })
            console.log('Update avatar success', result.url)
        }
    } catch (error) {
        console.log(error)
    }
})
