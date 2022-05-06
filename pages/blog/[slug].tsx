import { gql } from '@apollo/client'
import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
} from 'next'
import { Section } from '@components/Section'
import client from '@helpers/graphql'
import { Post } from '@schema/post'
import { TagList } from '@components/TagList'

const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { title, description, date, categories, content } = post
  return (
    <>
      <Section
        big
        name={title}
        description={`${description}`}
        className="py-10"
      >
        <p>
          <strong>Published On:</strong> {date}
        </p>
        <TagList tags={categories} />
        {content}
      </Section>
    </>
  )
}

export default BlogPost

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug } = params!
  const { data } = await client.query<{ post: Post }>({
    query: gql`
      query getBlogpost($slug: String) {
        post(where: { slug: $slug }) {
          slug
          title
          description
          date
          content
          categories {
            slug
            title
          }
        }
      }
    `,
    variables: {
      slug,
    },
  })
  return {
    props: { post: data.post },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ posts: Post[] }>({
    query: gql`
      query {
        posts {
          slug
        }
      }
    `,
  })
  return {
    paths: data.posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
