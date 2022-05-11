import { gql } from '@apollo/client'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { BlogCard } from '@components/BlogCard'
import { Hero } from '@components/Hero'
import { Link } from '@components/Link'
import { Section } from '@components/Section'
import client from '@helpers/graphql'
import { Post } from '@schema/post'
import { Placeholder } from '@components/Placeholder'
import { BlogGrid } from '@components/BlogGrid'
import { Meta } from '@schema/meta'
import { serialize } from '@helpers/mdx'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  meta,
}) => {
  return (
    <>
      <Hero featuredContentMdx={meta.content} />
      <Section
        name="Blog"
        description="I write about the projects I've worked on, experience and learnings along the way"
      >
        {posts.length > 0 ? (
          <>
            <BlogGrid posts={posts} />
            <Link href="/blog">See more! {'->'}</Link>
          </>
        ) : (
          <Placeholder>Coming soon!</Placeholder>
        )}
      </Section>
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const { data } = await client.query<{ posts: Post[]; meta: Meta }>({
    query: gql`
      query {
        posts(first: 4, orderBy: date_DESC) {
          slug
          title
          description
          date
          categories {
            slug
            title
          }
        }
        meta(where: { key: "featuredContent" }) {
          content
        }
      }
    `,
  })
  const meta = { content: await serialize(data.meta.content) }
  return {
    props: { posts: data.posts, meta },
  }
}
