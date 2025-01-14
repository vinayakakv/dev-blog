import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { createRedisClient } from 'external'
import {chromium as playwright} from 'playwright-core'
import chromium from '@sparticuz/chromium'

const cloudMailinEmailSchema = z.object({
  plain: z.string(),
  envelope: z.object({
    from: z.literal('me.vinayakakv@gmail.com'),
  }),
  headers: z.object({
    authorization: z.string()
  })
})

const normalizePreviewData = async (url: string) => {
  await using browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })

  const title = await page.title()
  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')
    .catch(() => '')
  const image = await page
    .locator('meta[property="og:image"]')
    .getAttribute('content')
    .catch(() => '')

  return {
    title: title || new URL(url).hostname,
    description,
    image,
    url,
    date: new Date().toISOString(),
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await using redis = await createRedisClient()

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (req.headers.authorization !== process.env['EMAIL_AUTHORIZATION']) {
    return res.status(401).end()
  }

  console.log({ body: req.body, headers: req.headers })

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

  await redis.lPush('linkList', JSON.stringify(normalized))

  return res.status(200).json({ success: true })
}
