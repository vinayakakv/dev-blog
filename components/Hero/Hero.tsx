import { Button } from '../Button'
import { Icon } from '../Icon'
import { Link } from '../Link'

export function Hero() {
  return (
    <section className="flex flex-col gap-8 py-10">
      <h2 className="text-xl">Hi, I'm Vinayaka K V</h2>
      <h1 className="text-4xl">
        I build softwares <b className="text-green-400">that matter.</b>
      </h1>
      <h2 className="text-xl">
        <Link href="https://vinayakakv.com" external>
          I also hunt mountains, do photography and write about nature! {'->'}
        </Link>
      </h2>
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <Button className="flex-1" icon={<Icon name="linkedin" />}>
          LinkedIn
        </Button>
        <Button className="flex-1" icon={<Icon name="github" />}>
          GitHub
        </Button>
        <Button className="flex-1" icon={<Icon name="mail" />}>
          Email
        </Button>
        <Button className="flex-1" icon={<Icon name="download" />}>
          Resume
        </Button>
      </div>
    </section>
  )
}
