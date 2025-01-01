import type { InferGetStaticPropsType, NextPage } from 'next'
import { BlogCard } from '@components/BlogCard'
import { Section } from '@components/Section'
import { Placeholder } from '@components/Placeholder'
import { getMdxFiles } from '@helpers/mdx'

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <Section
        big
        name="Blog"
        description="I write about the projects I've worked on, and my experience and learnings along the way"
      >
        <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard
                title={post.title}
                description={post.description}
                date={post.date}
                slug={`/blog/${post.slug}`}
                key={post.slug}
              />
            ))
          ) : (
            <Placeholder>Coming Soon!</Placeholder>
          )}
        </div>
      </Section>
    </>
  )
}

export default Blog

export const getStaticProps = async () => {
  const posts = await getMdxFiles('posts')

  // Sort posts by date in descending order
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return {
    props: { posts: sortedPosts },
  }
}
