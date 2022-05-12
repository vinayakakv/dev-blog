import { MDXComponents } from '@components/MDXComponents'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

type Props = {
  featuredContentMdx: Omit<MDXRemoteProps, 'components' | 'lazy'>
}

export function Hero({ featuredContentMdx }: Props) {
  return (
    <section className="flex flex-col gap-8 py-10">
      <h2>Hello World! I'm Vinayaka K V</h2>
      <p className="text-4xl">
        I build software <b className="text-green-400">that matters.</b>
      </p>
      <p className="prose prose-invert max-w-none">
        <MDXRemote {...featuredContentMdx} components={MDXComponents} />
      </p>
    </section>
  )
}
