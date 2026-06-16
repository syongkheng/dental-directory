import { defaultIconProps, type IconProps } from './types'

/** Used for the Plan → Do → Check → Act process section. */
export function Cycle(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 3v4h-4" />
    </svg>
  )
}
