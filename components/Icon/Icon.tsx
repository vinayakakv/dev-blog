import { LinkedIn } from './LinkedIn'
import { GitHub } from './GitHub'
import { Download } from './Download'
import { Mail } from './Mail'
import { Menu } from './Menu'
import { Close } from './Close'

type Props = {
  name: 'linkedin' | 'mail' | 'download' | 'github' | 'menu' | 'close'
}

export function Icon({ name }: Props) {
  let icon = null
  switch (name) {
    case 'linkedin':
      icon = <LinkedIn />
      break
    case 'mail':
      icon = <Mail />
      break
    case 'download':
      icon = <Download />
      break
    case 'github':
      icon = <GitHub />
      break
    case 'menu':
      icon = <Menu />
      break
    case 'close':
      icon = <Close />
      break
  }
  return icon && <div className="h-4 w-4">{icon}</div>
}
