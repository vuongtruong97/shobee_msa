import Queue from 'bull'
import { uploadToCloudinary } from '../utils/uploadImage'
import { rabbitWrapper } from '../rabbitmq-wrapper'

interface Data {}

export const imageUploadQueue = new Queue<Data>('review.image.upload', {
    redis: {
        host: 'redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11890,
        password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
    },
})

imageUploadQueue.process(async (job) => {
    try {
    } catch (error) {
        console.log(error)
    }
})
