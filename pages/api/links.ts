import { redis } from 'external'
import type { NextApiRequest, NextApiResponse } from 'next'

redis.connect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Get all links from Redis sorted set in reverse order (newest first)
  const links = await redis.zRange('links', 0, -1, {
    REV: true,
  })

  // Parse JSON strings back to objects
  const parsedLinks = links.map((link) => JSON.parse(link))

  return res.status(200).json(parsedLinks)
}
