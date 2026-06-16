import { defaultIconProps, type IconProps } from './types'

export function Close(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}
