import type { MDXRemoteProps } from 'next-mdx-remote'
import { Link } from './Link'

export const MDXComponents: MDXRemoteProps['components'] = {
  a: (props) =>
    ['/', '#'].some((x) => props.href?.startsWith(x)) ? (
      <Link {...props} />
    ) : (
      <Link external {...props} />
    ),
}
