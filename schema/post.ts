import type { Category } from './category'

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  content: string
  categories: Category[]
}
