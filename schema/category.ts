import type { Post } from './post'

export type Category = {
  title: string
  slug: string
  posts: Post[]
}
