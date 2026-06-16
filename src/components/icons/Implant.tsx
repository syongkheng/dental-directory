import { defaultIconProps, type IconProps } from './types'

export function Implant(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M9 3h6l1 4-2 2v3l2 9H8l2-9V9L8 7l1-4Z" />
      <path d="M9.5 12.5h5" />
      <path d="M9.8 15.5h4.4" />
    </svg>
  )
}
