import { defaultIconProps, type IconProps } from './types'

export function Moon(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  )
}
