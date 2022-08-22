import { createClient } from 'redis'

const redisClient = createClient({
    url: `redis://redis-11890.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:11890`,
    password: 'FIsyZiskiX8d89QN1cDpjLZL1sXtgnLC',
})

const connectRedis = async () => {
    try {
        redisClient.on('error', function (err) {
            console.error('Could not establish a connection with redis. ' + err)
        })
        redisClient.on('connect', function (err) {
            console.log('Connected to redis successfully')
        })
        await redisClient.connect()
    } catch (error) {
        console.error(error)
    }
}

export { connectRedis, redisClient }
