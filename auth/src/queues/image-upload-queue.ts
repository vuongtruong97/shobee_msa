import Queue from 'bull'
import { v2, uploadToCloudinary } from '../utils/uploadImage'
import fs from 'fs'
import { User } from '../models/User'

interface Data {
    userId: string
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
            folder: 'avatar',
            format: 'webp',
            transformation: { width: 300, height: 300 },
        })
        if (result) {
            await User.findByIdAndUpdate(job.data.userId, { avatar_url: result.url })
        }
        console.log('Update avatar success')
    } catch (error) {
        console.log(error)
    }
})
