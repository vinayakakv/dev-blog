import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Link } from '../Link'

const menuLinks = [
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'Collections',
    link: '/category',
  },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useRouter()
  const activeRoute = pathname.split('/').slice(0, 2).join('/')
  const menuItems = (
    <menu className="flex  flex-col items-center gap-6 font-semibold sm:flex-row">
      {menuLinks.map(({ name, link }) => (
        <li key={link} className={link === activeRoute ? 'underline' : ''}>
          <Link href={link}>{name}</Link>
        </li>
      ))}
    </menu>
  )
  return (
    <nav className="fixed left-0 top-0  w-full bg-gray-900 bg-opacity-60 px-5 py-2 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-2">
        <section className="flex flex-row items-center justify-between">
          <span className="font-mono font-semibold text-green-400">
            <Link href="/">vinayakakv</Link>
          </span>
          <div className="hidden sm:block">{menuItems}</div>
          <Button
            className="block sm:hidden"
            icon={<Icon name={menuOpen ? 'close' : 'menu'} />}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </section>
        <section className="flex flex-col sm:hidden">
          {menuOpen && menuItems}
        </section>
      </div>
    </nav>
  )
}
