import { Tag } from '@components/Tag'
import { Category } from '@schema/category'

type Props = {
  tags: Category[]
}

export function TagList({ tags }: Props) {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {tags.map(({ title, slug }) => (
        <Tag key={slug} name={title} link={`/category/${slug}`} />
      ))}
    </div>
  )
}
