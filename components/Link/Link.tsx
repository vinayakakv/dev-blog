import React from 'react'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

type Props = React.HTMLProps<HTMLAnchorElement> & { external?: boolean }

export function Link({
  href,
  external = false,
  className = '',
  ...rest
}: Props) {
  const finalClassName = twMerge('text-green-400 hover:underline', className)
  return external ? (
    <a href={href} className={finalClassName} target="_blank" {...rest} />
  ) : (
    <NextLink href={href!} passHref>
      <a className={finalClassName} {...rest} />
    </NextLink>
  )
}
