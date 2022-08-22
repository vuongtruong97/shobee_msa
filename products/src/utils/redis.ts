import mongoose from 'mongoose'
import { createClient } from 'redis'

interface Options {
    time: number // seconds
    key?: any // key to hset in redis redis
}

// Module Augmentation
declare module 'mongoose' {
    interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType> {
        cache(options: Options): any
        useCache: boolean
        time: number
        hashKey: string
        mongooseCollection: any
    }
}

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

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options: Options) {
    try {
        this.useCache = true
        this.time = options.time
        this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name)

        return this // => Query instance
    } catch (error) {
        console.log(error)
    }
}

mongoose.Query.prototype.exec = async function () {
    try {
        if (!this.useCache) {
            // @ts-ignore
            return await exec.apply(this, arguments)
        }

        const key = JSON.stringify({
            ...this.getFilter(),
            ...this.getOptions(),
        })

        console.log(`KEY ${key} ${this.hashKey}`)

        const cacheValue = await redisClient.hGet(this.hashKey, key)

        if (cacheValue) {
            const doc = JSON.parse(cacheValue)

            console.log('Response from Redis')
            return Array.isArray(doc)
                ? doc.map((d) => new this.model(d))
                : new this.model(doc)
        }

        // @ts-ignore
        const result = await exec.apply(this, arguments)
        console.log(this.time)

        await redisClient.hSet(this.hashKey, key, JSON.stringify(result))
        await redisClient.expire(this.hashKey, this.time)

        console.log('Response from MongoDB')
        return result
    } catch (error) {
        console.log(error)
    }
}

function clearKey(hashKey: string) {
    redisClient.del(JSON.stringify(hashKey))
}

export { connectRedis, redisClient }
