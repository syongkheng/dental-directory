import { defaultIconProps, type IconProps } from './types'

export function Menu(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}
