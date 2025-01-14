import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { createRedisClient } from 'external'
import axios from 'axios'
import { JSDOM } from 'jsdom'

const cloudMailinEmailSchema = z.object({
  plain: z.string(),
  envelope: z.object({
    from: z.literal('me.vinayakakv@gmail.com'),
  })
})

const normalizePreviewData = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'X-Forwarded-For': '66.249.66.1'
    },
    maxRedirects: 5
  })

  const dom = new JSDOM(response.data)
  const document = dom.window.document

  const title = document.title
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || null
  const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null
  const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')?.getAttribute('href') || null

  const normalizedFavicon = favicon 
    ? new URL(favicon, url).toString() 
    : `${new URL(url).origin}/favicon.ico`

  return {
    title: title || new URL(url).hostname,
    description,
    image,
    favicon: normalizedFavicon,
    url,
    date: new Date().toISOString(),
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log({ body: req.body, headers: req.headers })

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (req.headers.authorization !== process.env['EMAIL_AUTHORIZATION']) {
    console.log({
      req: req.headers.authorization,
      env: process.env['EMAIL_AUTHORIZATION']
    })
    return res.status(401).end()
  }

  const validationResult = cloudMailinEmailSchema.safeParse(req.body)

  if (!validationResult.success) {
    return res.status(400).end()
  }

  const link = validationResult.data.plain.split('\n').at(0)?.trim()

  if (!link) {
    return res.status(400).end()
  }

  const normalized = await normalizePreviewData(link)

  console.log({ normalized })

  await using redis = await createRedisClient()

  await redis.lPush('linkList', JSON.stringify(normalized))

  return res.status(200).json({ success: true })
}
