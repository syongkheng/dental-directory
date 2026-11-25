import { defaultIconProps, type IconProps } from './types'

export function Arrow(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Download(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  )
}

export function Chevron(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/* Trust strip (M08) icons. */
export function Calendar(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
    </svg>
  );
}

export function Building(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M4 20.5h16M6 20.5V8l6-4 6 4v12.5M10 20.5v-4h4v4M9.5 10.5h.01M14.5 10.5h.01M9.5 13.5h.01M14.5 13.5h.01" />
    </svg>
  );
}

export function Layers(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </svg>
  );
}

export function Award(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9.5 9 1.7 1.7L14.5 7.5M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5" />
    </svg>
  );
}

export function Scan(props: IconProps) {
  return (
    <svg {...defaultIconProps} {...props}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M7.5 12h9" />
    </svg>
  );
}
