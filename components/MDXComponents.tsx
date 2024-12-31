import type { MDXRemoteProps } from 'next-mdx-remote'
import { Link } from './Link'
import { BlogCard } from './BlogCard'
import { Button } from './Button'

export const MDXComponents: MDXRemoteProps['components'] = {
  a: (props) =>
    ['/', '#'].some((x) => props.href?.startsWith(x)) ? (
      <Link {...props} />
    ) : (
      <Link external {...props} />
    ),
  BlogCard: ({ slug, title }: { slug: string; title: string }) => (
    <div className="flex max-w-md flex-row flex-wrap items-center justify-between gap-x-2 gap-y-4 bg-gray-700 px-4 py-2 hover:bg-gray-600">
      <Link href={slug} className="text-white no-underline" external>
        <h3 className="m-0">{title}</h3>
      </Link>
      <div className="flex flex-row flex-wrap items-center justify-between gap-2">
        <Link href={slug} className="no-underline" external>
          <Button>{'Read More ->'}</Button>
        </Link>
      </div>
    </div>
  ),
}
