import type { InferGetStaticPropsType, NextPage } from 'next'
import { Section } from '@components/Section'
import { Placeholder } from '@components/Placeholder'
import { Tag } from '@components/Tag'
import { getMdxFiles } from '@helpers/mdx'
import { Category } from '@schema/category'

type CategoryWithPostCount = Category & { postCount: number }

const CategoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ categories }) => {
  return (
    <>
      <Section big name="Categories" description="">
        <div className="flex flex-row flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Tag
                name={`${category.title} (${category.postCount})`}
                link={`/category/${category.slug}`}
                key={category.slug}
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
  const posts = await getMdxFiles('posts')

  const categoryMap = new Map<string, CategoryWithPostCount>()

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (categoryMap.has(category.slug)) {
        categoryMap.get(category.slug)!.postCount++
      } else {
        categoryMap.set(category.slug, {
          ...category,
          postCount: 1,
        })
      }
    })
  })

  const categories = Array.from(categoryMap.values()).sort(
    (a, b) => b.postCount - a.postCount
  )

  return {
    props: { categories },
  }
}
