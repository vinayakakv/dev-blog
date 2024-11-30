import type { InferGetStaticPropsType, NextPage } from 'next'
import { Hero } from '@components/Hero'
import { Link } from '@components/Link'
import { Section } from '@components/Section'
import { Placeholder } from '@components/Placeholder'
import { BlogGrid } from '@components/BlogGrid'
import { getMdxFiles, readMdxFile } from '@helpers/mdx'
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
  const posts = await getMdxFiles('posts')
  const meta = await readMdxFile('meta', 'featuredContent.mdx')

  return {
    props: {
      posts: posts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6),
      meta: { content: await serialize(meta.content) },
    },
  }
}
