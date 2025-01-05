import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { getLinkPreview } from 'link-preview-js'
import { createRedisClient } from 'external'

const cloudMailinEmailSchema = z.object({
  plain: z.string(),
  envelope: z.object({
    from: z.literal('me.vinayakakv@gmail.com'),
  }),
})

const normalizePreviewData = (
  data: Awaited<ReturnType<typeof getLinkPreview>>
) => ({
  title: 'title' in data ? data.title : new URL(data.url).hostname,
  description: 'description' in data ? data.description || null : null,
  image: 'images' in data ? data.images[0] || null : null,
  url: data.url,
  date: new Date().toISOString(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await using redis = await createRedisClient()

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  console.log(req.body)

  const validationResult = cloudMailinEmailSchema.safeParse(req.body)

  if (!validationResult.success) {
    return res.status(400).end()
  }

  const link = validationResult.data.plain.split('\n').at(0)?.trim()

  if (!link) {
    return res.status(400).end()
  }

  const previewData = await getLinkPreview(link, {
    followRedirects: `manual`,
    handleRedirects: (baseURL, forwardedURL) => {
      const urlObj = new URL(baseURL)
      const forwardedURLObj = new URL(forwardedURL)
      if (
        forwardedURLObj.hostname === urlObj.hostname ||
        forwardedURLObj.hostname === 'www.' + urlObj.hostname ||
        'www.' + forwardedURLObj.hostname === urlObj.hostname
      ) {
        return true
      } else {
        return false
      }
    },
  })
  const normalized = normalizePreviewData(previewData)

  console.log({ previewData, normalized })

  const timestamp = new Date(normalized.date).getTime()
  await redis.zAdd('links', {
    score: timestamp,
    value: JSON.stringify(normalized),
  })
  
  return res.status(200).json({ success: true })
}
