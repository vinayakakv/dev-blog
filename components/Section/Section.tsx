import React from 'react'

type Props = {
  name: string
  description: string
  children: React.ReactNode
}

export function Section({ name, description, children }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <h2>{name}</h2>
      <p>{description}</p>
      {children}
    </section>
  )
}
