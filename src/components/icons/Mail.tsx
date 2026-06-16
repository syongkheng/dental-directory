import { defaultIconProps, type IconProps } from './types'

export function Mail(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}
