import { Post } from '@schema/post'
import { formatDate } from '@utils'
import { Button } from './Button'
import { Link } from './Link'

type Props = Omit<Post, 'content' | 'tldr'>

export function BlogCard({ title, description, slug, date }: Props) {
  return (
    <div className="flex max-w-md flex-col items-stretch justify-between gap-4 bg-gray-700 px-4 py-2 hover:bg-gray-600">
      <Link href={slug} className="text-white">
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
      <div className="flex flex-row flex-wrap items-center justify-between gap-2">
        <p>{formatDate(date)}</p>
        <Link href={slug}>
          <Button>{'Read More →'}</Button>
        </Link>
      </div>
    </div>
  )
}
