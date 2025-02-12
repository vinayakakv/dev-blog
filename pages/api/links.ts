import { createRedisClient } from 'external'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await using redis = await createRedisClient()

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Get all links from Redis list (already in newest-first order due to LPUSH)
  const links = await redis.lRange('linkList', 0, -1)

  // Parse JSON strings back to objects
  const parsedLinks = links.map((link) => JSON.parse(link))

  return res.status(200).json(parsedLinks)
}
