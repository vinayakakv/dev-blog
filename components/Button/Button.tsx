import React from 'react'

type Props = React.HTMLProps<HTMLButtonElement> & {
  icon?: React.ReactNode
}

export function Button({ children, icon, className, type, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={`${className} flex flex-row items-center justify-center gap-4 border-2 border-white px-4 py-2 text-white hover:border-green-400 hover:text-green-400`}
    >
      {!!icon && icon}
      {children}
    </button>
  )
}
