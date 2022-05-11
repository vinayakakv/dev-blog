import { MDXComponents } from '@components/MDXComponents'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

import { Link } from '../Link'

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
      <p className="prose prose-invert max-w-2xl">
        <MDXRemote {...featuredContentMdx} components={MDXComponents} />
      </p>
      <p className="text-xl">
        <Link href="https://vinayakakv.com" external>
          I also hunt mountains, do photography and write about nature! {'->'}
        </Link>
      </p>
    </section>
  )
}
