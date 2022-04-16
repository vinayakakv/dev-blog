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
    link: '/collection',
  },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuItems = (
    <menu className="flex flex-col items-center gap-6 sm:flex-row">
      {menuLinks.map(({ name, link }) => (
        <li key={link}>
          <Link href={link}>{name}</Link>
        </li>
      ))}
    </menu>
  )
  return (
    <nav className="flex flex-col gap-2 py-2">
      <section className="flex flex-row items-center justify-between">
        <span className="text-green-400">dev.vinayakakv</span>
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
    </nav>
  )
}
