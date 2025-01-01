import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
} from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { Section } from '@components/Section'
import { Link } from '@components/Link'
import { serialize, readMdxFile, getMdxFiles } from '@helpers/mdx'
import Head from 'next/head'
import { formatDate } from '@utils'
import { MDXComponents } from '@components/MDXComponents'
import { ArticleJsonLd, DefaultSeo } from 'next-seo'
import 'katex/dist/katex.min.css'

const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { title, description, date, content, tldr, slug } = post
  const className = `prose prose-invert mt-4 max-w-none prose-custom`
  return (
    <>
      <ArticleJsonLd
        title={title}
        description={description}
        datePublished={date}
        url={`https://vinayakakv.com/blog/${slug}`}
        images={[]}
        authorName="Vinayaka K V"
      />
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'article',
          url: `https://vinayakakv.com/blog/${slug}`,
          article: {
            authors: ['Vinayaka K V'],
            publishedTime: date,
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
        <p className="text-sm">
          <strong>Published On:</strong> {formatDate(date)}
        </p>
        <Link href="#summary">TL; DR {'→'}</Link>
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
  const post = await readMdxFile('posts', `${params!.slug}.mdx`)
  return {
    props: {
      post: {
        ...post,
        content: await serialize(post.content),
        tldr: await serialize(post.tldr),
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
