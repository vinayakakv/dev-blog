import { gql } from '@apollo/client'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { BlogCard } from '@components/BlogCard'
import { Section } from '@components/Section'
import client from '@helpers/graphql'
import { Post } from '@schema/post'
import { Placeholder } from '@components/Placeholder'

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
                categories={post.categories}
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
  const { data } = await client.query<{ posts: Post[] }>({
    query: gql`
      query {
        posts(orderBy: date_DESC) {
          slug
          title
          description
          date
          categories {
            slug
            title
          }
        }
      }
    `,
  })
  return {
    props: { posts: data.posts },
  }
}
