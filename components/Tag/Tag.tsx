import { Link } from '../Link'

type Props = {
  name: string
  link: string
}

export function Tag({ name, link }: Props) {
  return (
    <p className="bg-green-900 py-1 px-4 ">
      <Link href={link}>{name}</Link>
    </p>
  )
}
