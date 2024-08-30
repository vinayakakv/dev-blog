import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
} from 'next'
import { Section } from '@components/Section'
import { BlogGrid } from '@components/BlogGrid'
import { getMdxFiles } from '@helpers/mdx'

const CategoryDetailsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ category, posts }) => {
  return (
    <>
      <Section
        big
        name={category.title}
        description={`${posts.length} article(s)`}
      >
        <BlogGrid posts={posts} />
      </Section>
    </>
  )
}

export default CategoryDetailsPage

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const slug = params?.slug
  if (!slug) {
    return { notFound: true }
  }

  const allPosts = await getMdxFiles<'posts'>('posts')

  const posts = allPosts.filter((post) =>
    post.categories.some((category) => category.slug === slug)
  )

  if (posts.length === 0) {
    return { notFound: true }
  }

  const category = posts[0].categories.find((cat) => cat.slug === slug)!

  return {
    props: {
      category,
      posts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getMdxFiles<'posts'>('posts')

  const categorySet = new Set<string>()
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      categorySet.add(category.slug)
    })
  })

  const paths = Array.from(categorySet).map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
