import { defaultIconProps, type IconProps } from './types'

export function Phone(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M5 4h3.2l1.3 4.3-2 1.6a12 12 0 0 0 6.6 6.6l1.6-2 4.3 1.3V19a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}
