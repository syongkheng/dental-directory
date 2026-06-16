import { defaultIconProps, type IconProps } from './types'

export function Veneer(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M8 3.5c-1.6.4-2.8 1.8-2.8 4 0 4.5 1.3 13 3.3 13 1 0 1.2-1.8 1.7-3" />
      <path d="M12.5 3c2.4 0 4.5 1.8 4.5 5 0 5-1.6 12.5-3.6 12.5-.9 0-1.3-1.2-1.7-2.6" />
      <path d="M5.5 7.5h11.5" strokeDasharray="2 2" />
    </svg>
  )
}
