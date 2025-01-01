import { MDXComponents } from '@components/MDXComponents'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

type Props = {
  featuredContentMdx: Omit<MDXRemoteProps, 'components' | 'lazy'>
}

export function Hero({ featuredContentMdx }: Props) {
  return (
    <section className="flex flex-col gap-6 py-10">
      <h1 className="font-mono text-4xl">
        Hi there, Welcome to <span className="text-green-400">Vinayaka</span>'s
        space!
      </h1>
      <p className="font-mono text-xl font-extralight">
        I am a Software Engineer focused on building and shipping{' '}
        <span className="text-green-400">quality software</span>. I'm also a{' '}
        <a
          href="https://vinayakakv.substack.com"
          target="_blank"
          className="text-green-400 underline"
        >
          photographer
        </a>
        .
      </p>
      <section className="prose prose-invert max-w-none font-extralight">
        <MDXRemote {...featuredContentMdx} components={MDXComponents} />
      </section>
    </section>
  )
}
