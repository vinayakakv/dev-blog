import { gql } from '@apollo/client'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { Section } from '@components/Section'
import client from '@helpers/graphql'
import { Placeholder } from '@components/Placeholder'
import { Category } from '@schema/category'
import { Tag } from '@components/Tag'

const CategoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ categories }) => {
  return (
    <>
      <Section big name="Categories" description="" className="py-10">
        <div className="flex flex-row flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Tag
                name={`${category.title} (${category.posts.length})`}
                link={`/category/${category.slug}`}
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

export default CategoryPage

export const getStaticProps = async () => {
  const { data } = await client.query<{ categories: Category[] }>({
    query: gql`
      query {
        categories {
          slug
          title
          posts {
            slug
            title
          }
        }
      }
    `,
  })
  return {
    props: { categories: data.categories },
  }
}
