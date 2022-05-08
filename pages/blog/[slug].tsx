import { gql } from '@apollo/client'
import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
} from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
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
      <Section big name={title} description={`${description}`}>
        <p>
          <strong>Published On:</strong> {date}
        </p>
        <TagList tags={categories} />
        <article className="prose prose-invert mt-4 max-w-none">
          <MDXRemote {...content} />
        </article>
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
  const post = { ...data.post, content: await serialize(data.post.content) }
  return {
    props: { post },
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
