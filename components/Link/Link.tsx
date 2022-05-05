import React from 'react'
import NextLink from 'next/link'

type Props = React.HTMLProps<HTMLAnchorElement> & { external?: boolean }

export function Link({ href, external = false, ...rest }: Props) {
  const className = 'hover:text-green-400 hover:underline'
  return external ? (
    <a href={href} className={className} target="_blank" {...rest} />
  ) : (
    <NextLink href={href!} passHref>
      <a className={className} {...rest} />
    </NextLink>
  )
}
