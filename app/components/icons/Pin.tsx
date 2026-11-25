import { defaultIconProps, type IconProps } from './types'

export function Pin(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  )
}
