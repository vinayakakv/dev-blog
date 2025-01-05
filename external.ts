import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL,
})

export const createRedisClient = async () => {
  const client = await redis.connect()
  return Object.assign(client, {
    [Symbol.asyncDispose]: async () => await client.disconnect(),
  })
}
