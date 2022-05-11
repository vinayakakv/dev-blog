import { Button } from '@components/Button'
import { Link } from '@components/Link'
import { Icon, IconName } from '../Icon'

type HeroLink = {
  name: string
  icon: IconName
  link: string
  external: boolean
}

const links: HeroLink[] = [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://linkedin.com/in/vinayakakv',
    external: true,
  },
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/vinayakakv',
    external: true,
  },
  {
    name: 'Email',
    icon: 'mail',
    link: 'mailto:me.vinayakakv@gmail.com',
    external: true,
  },
  {
    name: 'Resume',
    icon: 'download',
    link: 'https://github.com/vinayakakv/vinayakakv/blob/main/Vinayaka%20Resume.pdf',
    external: true,
  },
]

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-2 pb-2 pt-10 text-center text-gray-400">
      <div
        className="flex flex-row flex-wrap justify-between gap-4"
        id="contact"
      >
        {links.map(({ icon, link, external }) => (
          <Link href={link} key={link} external={external} className="contents">
            <Button className="border-none" icon={<Icon name={icon} />} />
          </Link>
        ))}
      </div>

      <p>Copyright 2022-present Vinayaka K V. All rights reserved.</p>

      <p>
        Website is open source. View source at{' '}
        <Link href="https://github.com/vinayakakv/dev-blog" external>
          GitHub
        </Link>
        .
      </p>
    </footer>
  )
}
