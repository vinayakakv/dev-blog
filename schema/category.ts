import type { Post } from './post'

export type Category = {
  title: string
  slug: string
  description: string
  posts: Post[]
}
