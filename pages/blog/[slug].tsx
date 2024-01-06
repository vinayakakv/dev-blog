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
import Head from 'next/head'
import { formatDate } from '@utils'
import { MDXComponents } from '@components/MDXComponents'
import { ArticleJsonLd, DefaultSeo } from 'next-seo'

const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { title, description, date, categories, content, tldr, slug } = post
  const className = `prose prose-invert mt-4 max-w-none prose-custom`
  return (
    <>
      <ArticleJsonLd
        title={title}
        description={description}
        datePublished={date}
        url={`https://dev.vinayakakv.com/blog/${slug}`}
        images={[]}
        authorName="Vinayaka K V"
      />
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'article',
          url: `https://dev.vinayakakv.com/blog/${slug}`,
          article: {
            authors: ['Vinayaka K V'],
            publishedTime: date,
            tags: categories.map((category) => category.title),
          },
        }}
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css"
        />
      </Head>
      <Section big name={title} description={`${description}`}>
        <p>
          <strong>Published On:</strong> {formatDate(date)}
        </p>
        <TagList tags={categories} />
        <Link href="#summary">TL; DR {'->'}</Link>
        <article className={className}>
          <MDXRemote {...content} components={MDXComponents} />
        </article>
        <summary id="summary" className={className}>
          <h2>TL;DR</h2>
          <MDXRemote {...tldr} components={MDXComponents} />
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
