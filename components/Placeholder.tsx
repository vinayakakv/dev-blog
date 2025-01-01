type Props = {
  children: React.ReactNode
  className?: string
}

export function Placeholder({ children, className = '' }: Props) {
  return <p className={`text-gray-400 ${className}`}>{children}</p>
}
