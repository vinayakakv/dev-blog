import { TagList } from '@components/TagList'
import { Post } from '@schema/post'
import { formatDate } from '@utils'
import { Button } from '../Button'
import { Link } from '../Link'

type Props = Omit<Post, 'content' | 'tldr'>

export function BlogCard({
  title,
  description,
  slug,
  date,
  categories,
}: Props) {
  return (
    <div className="flex max-w-md flex-col items-stretch justify-between gap-2 bg-gray-800 px-4 py-2 hover:bg-gray-700">
      <Link href={slug} className="text-white">
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
      <TagList tags={categories} />
      <div className="flex flex-row flex-wrap items-center justify-between gap-2">
        <p>{formatDate(date)}</p>
        <Link href={slug}>
          <Button>{'Read More ->'}</Button>
        </Link>
      </div>
    </div>
  )
}
