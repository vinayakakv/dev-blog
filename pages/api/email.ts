import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { getLinkPreview } from 'link-preview-js'

const cloudMailinEmailSchema = z.object({
  plain: z.string(),
  envelope: z.object({
    from: z.literal('me.vinayakakv@gmail.com'),
  }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  console.log(req.body)

  const validationResult = cloudMailinEmailSchema.safeParse(req.body)

  if (!validationResult.success) {
    return res.status(400).json(validationResult.error)
  }

  const body = validationResult.data.plain
  const firstLink = body.split('\n').at(0)?.trim()

  if (!firstLink) {
    return res.status(400).json({ message: 'Missing email' })
  }

  const previewData = await getLinkPreview(firstLink)
  console.log('Link preview:', previewData)

  return res.status(200).json({ success: true })
}
