import { BlogCard } from '@components/BlogCard'
import { Post } from '@schema/post'

type Props = {
  posts: Post[]
}

export function BlogGrid({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <BlogCard
          title={post.title}
          description={post.description}
          date={post.date}
          slug={`/blog/${post.slug}`}
          key={post.slug}
          categories={post.categories}
        />
      ))}
    </>
  )
}
