import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
} from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { Section } from '@components/Section'
import { Post } from '@schema/post'
import { TagList } from '@components/TagList'
import { Link } from '@components/Link'
import { serialize, readMdxFile, getMdxFiles } from '@helpers/mdx'
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
  const post = await readMdxFile('posts', `${slug}.mdx`)
  const serializedContent = await serialize(post.content)
  const serializedTldr = await serialize(post.tldr)

  return {
    props: {
      post: {
        ...post,
        content: serializedContent,
        tldr: serializedTldr,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getMdxFiles('posts')
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
