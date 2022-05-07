import { Link } from '@components/Link'

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center py-2">
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
