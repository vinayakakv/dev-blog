import React from 'react'

type Props = {
  name: string
  description: string
  children: React.ReactNode
  big?: boolean
  className?: string
}

export function Section({
  name,
  description,
  children,
  big = false,
  className = '',
}: Props) {
  const H = big ? 'h1' : 'h2'
  return (
    <section className={`flex flex-col gap-4 ${className}`}>
      <H>{name}</H>
      <p className="text-sm">{description}</p>
      {children}
    </section>
  )
}
