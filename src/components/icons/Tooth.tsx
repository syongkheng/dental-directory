import { defaultIconProps, type IconProps } from './types'

export function Tooth(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M12 3c-2 0-3.2 1.1-4.3 1.1-1.6 0-2.7-1-3.7 0-1.2 1.2-.6 3.6-.3 5.4.4 2.6 1.4 8.5 3.3 8.5 1.5 0 1.5-3 2.5-3.4.5-.2 1 .1 1.5.1.5 0 1-.3 1.5-.1 1 .4 1 3.4 2.5 3.4 1.9 0 2.9-5.9 3.3-8.5.3-1.8.9-4.2-.3-5.4-1-1-2.1 0-3.7 0C15.2 4.1 14 3 12 3Z" />
    </svg>
  )
}
