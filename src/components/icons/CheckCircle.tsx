import { defaultIconProps, type IconProps } from './types'

export function CheckCircle(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.3 2.3 2.3 4.7-5" />
    </svg>
  )
}
