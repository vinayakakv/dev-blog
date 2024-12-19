import { z } from 'zod'
import { categorySchema } from './category'

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  content: z.string(),
  tldr: z.string(),
  categories: z.array(categorySchema).default([]),
})

export type Post = z.infer<typeof postSchema>
