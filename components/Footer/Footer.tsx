import { Link } from '@components/Link'

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center pb-2 pt-10 text-gray-400">
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
