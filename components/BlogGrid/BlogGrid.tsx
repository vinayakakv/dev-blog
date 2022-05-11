import { BlogCard } from '@components/BlogCard'
import { Post } from '@schema/post'

type Props = {
  posts: Post[]
}

export function BlogGrid({ posts }: Props) {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2">
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
    </div>
  )
}
