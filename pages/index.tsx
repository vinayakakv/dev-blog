import { gql } from '@apollo/client'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { BlogCard } from '@components/BlogCard'
import { Hero } from '@components/Hero'
import { Link } from '@components/Link'
import { Section } from '@components/Section'
import client from '@helpers/graphql'
import { Post } from '@schema/post'
import { Placeholder } from '@components/Placeholder'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <Hero />
      <Section
        name="Blog"
        description="I write about the projects I've worked on, experience and learnings along the way"
      >
        <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2">
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <BlogCard
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  slug={post.slug}
                  key={post.slug}
                  tags={post.categories.map((category) => ({
                    name: category.title,
                    slug: category.slug.toLocaleLowerCase(),
                  }))}
                />
              ))}
              <Link href="/blog">See more! {'->'}</Link>
            </>
          ) : (
            <Placeholder>Coming soon!</Placeholder>
          )}
        </div>
      </Section>
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const { data } = await client.query<{ posts: Post[] }>({
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
      }
    `,
  })
  return {
    props: { posts: data.posts },
  }
}
