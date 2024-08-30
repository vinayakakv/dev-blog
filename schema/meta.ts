import { z } from 'zod'

export const metaSchema = z.object({
  key: z.string(),
  content: z.string(),
})

export type Meta = z.infer<typeof metaSchema>
