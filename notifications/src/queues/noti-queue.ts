import Queue from 'bull'

interface Data {
    user_id: string
}

export const notifiQueue = new Queue<Data>('noti-queue', {
    redis: {
        host: 'redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11890,
        password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
    },
})

notifiQueue.process(async (job) => {
    try {
        console.log(job.data, 'noti-queue queue')
    } catch (error) {
        console.log(error)
    }
})
