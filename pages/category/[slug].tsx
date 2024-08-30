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
        description={`${posts.length} ${
          posts.length > 1 ? 'articles' : 'article'
        }`}
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

  const allPosts = await getMdxFiles('posts')

  const postsInCurrentCategory = allPosts.filter((post) =>
    post.categories.some((category) => category.slug === slug)
  )

  if (postsInCurrentCategory.length === 0) {
    return { notFound: true }
  }

  const currentCategory = postsInCurrentCategory[0]!.categories.find(
    (cat) => cat.slug === slug
  )!

  return {
    props: {
      category: currentCategory,
      posts: postsInCurrentCategory,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getMdxFiles('posts')

  const categorySlugs = [
    ...new Set(
      posts.flatMap((post) => post.categories.map((category) => category.slug))
    ),
  ]

  const paths = categorySlugs.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
