import { MDXComponents } from '@components/MDXComponents'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { Button } from '../Button'
import { Icon, IconName } from '../Icon'
import { Link } from '../Link'

type HeroLink = {
  name: string
  icon: IconName
  link: string
  external: boolean
}

type Props = {
  featuredContentMdx: Omit<MDXRemoteProps, 'components' | 'lazy'>
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
      <div className="flex flex-row flex-wrap justify-between gap-4">
        {links.map(({ name, icon, link, external }) => (
          <Link href={link} key={link} external={external} className="contents">
            <Button className="flex-1" icon={<Icon name={icon} />}>
              {name}
            </Button>
          </Link>
        ))}
      </div>
    </section>
  )
}
