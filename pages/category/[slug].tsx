import { gql } from '@apollo/client'
import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
} from 'next'
import { Section } from '@components/Section'
import client from '@helpers/graphql'
import { Category } from '@schema/category'
import { BlogGrid } from '@components/BlogGrid'

const CategoryDetailsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ category }) => {
  return (
    <>
      <Section
        big
        name={category.title}
        description={`${category.posts.length} article(s)`}
      >
        <BlogGrid posts={category.posts} />
      </Section>
    </>
  )
}

export default CategoryDetailsPage

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug } = params!
  const { data } = await client.query<{ category: Category }>({
    query: gql`
      query getCategory($slug: String) {
        category(where: { slug: $slug }) {
          slug
          title
          posts {
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
      }
    `,
    variables: {
      slug,
    },
  })
  return {
    props: { category: data.category },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ categories: Category[] }>({
    query: gql`
      query {
        categories {
          slug
        }
      }
    `,
  })
  return {
    paths: data.categories.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
