import { defaultIconProps, type IconProps } from './types'

export function Bridge(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M3 17V9.5C3 8 4.2 7 5.5 7S8 8 8 9.5V17" />
      <path d="M16 17V9.5C16 8 17.2 7 18.5 7S21 8 21 9.5V17" />
      <path d="M8 12c1-1.3 2.4-2 4-2s3 .7 4 2" />
      <path d="M3 17h18" />
    </svg>
  )
}
