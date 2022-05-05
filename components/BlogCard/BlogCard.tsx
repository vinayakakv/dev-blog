import { formatDate } from '@utils'
import { Button } from '../Button'
import { Link } from '../Link'
import { Tag } from '../Tag'

type Props = {
  title: string
  description: string
  slug: string
  date: string
  tags: { name: string; slug: string }[]
}

export function BlogCard({ title, description, slug, date, tags }: Props) {
  return (
    <div className="flex max-w-md flex-col items-stretch justify-between gap-2 bg-gray-800 px-4 py-2 hover:bg-gray-700">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="flex flex-row flex-wrap gap-1">
        {tags.map(({ name, slug }) => (
          <Tag key={slug} name={name} link={`/tags/${slug}`} />
        ))}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-2">
        <p>{formatDate(date)}</p>
        <Link href={`/blog/${slug}`}>
          <Button>{'Read More ->'}</Button>
        </Link>
      </div>
    </div>
  )
}
