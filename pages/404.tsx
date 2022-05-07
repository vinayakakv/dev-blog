import { Link } from '@components/Link'
import { Section } from '@components/Section'

export default function NotFound() {
  return (
    <Section
      name="Error 0x194"
      description="You are lost!!"
      className="mt-10"
      big
    >
      <h2>
        <Link href="/"> Go back to home {'->'} </Link>
      </h2>
    </Section>
  )
}
