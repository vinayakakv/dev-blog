import { z } from 'zod'

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  content: z.string(),
  tldr: z.string(),
})

export type Post = z.infer<typeof postSchema>
