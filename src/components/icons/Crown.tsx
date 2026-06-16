import { defaultIconProps, type IconProps } from './types'

export function Crown(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M3 8.5 7 11l5-6 5 6 4-2.5-1.6 9.5a1 1 0 0 1-1 .8H5.6a1 1 0 0 1-1-.8L3 8.5Z" />
      <path d="M7 17.5h10" />
    </svg>
  )
}
