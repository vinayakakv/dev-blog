import type { InferGetStaticPropsType, NextPage } from 'next'
import { BlogCard } from '@components/BlogCard'
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
  const posts = await getMdxFiles('posts', 4)
  const meta = await readMdxFile('meta', 'featuredContent.mdx')
  const serializedMeta = await serialize(meta.content)

  return {
    props: {
      posts,
      meta: { content: serializedMeta },
    },
  }
}
