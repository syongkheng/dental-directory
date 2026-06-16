import { defaultIconProps, type IconProps } from './types'

export function Lab(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M9 2v6.5L4.5 18a2 2 0 0 0 1.8 2.9h11.4a2 2 0 0 0 1.8-2.9L15 8.5V2" />
      <path d="M8 2h8" />
      <path d="M7 15h10" />
    </svg>
  )
}
