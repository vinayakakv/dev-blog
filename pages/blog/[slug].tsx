import { gql } from '@apollo/client'
import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
} from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { Section } from '@components/Section'
import client from '@helpers/graphql'
import { Post } from '@schema/post'
import { TagList } from '@components/TagList'
import { Link } from '@components/Link'
import { serialize } from '@helpers/mdx'

const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { title, description, date, categories, content, tldr } = post
  return (
    <>
      <Section big name={title} description={`${description}`}>
        <p>
          <strong>Published On:</strong> {date}
        </p>
        <TagList tags={categories} />
        <Link href="#summary">TL; DR</Link>
        <article className="prose prose-invert mt-4 max-w-none">
          <MDXRemote {...content} />
        </article>
        <summary id="summary" className="prose prose-invert mt-4 max-w-none">
          <h2>TL;DR</h2>
          <MDXRemote {...tldr} />
        </summary>
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
          tldr
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
  const post = {
    ...data.post,
    content: await serialize(data.post.content),
    tldr: await serialize(data.post.tldr),
  }
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
