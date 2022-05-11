import type { MDXRemoteProps } from 'next-mdx-remote'
import { Link } from './Link'

export const MDXComponents: MDXRemoteProps['components'] = {
  a: (props) =>
    props.href?.startsWith('/') ? (
      <Link {...props} />
    ) : (
      <Link external {...props} />
    ),
}
