import type { ReactElement } from 'react'
import { Crown, Bridge, Veneer, Implant } from '../components/icons'
import type { IconProps } from '../components/icons'

export interface ServiceItem {
  slug: string
  title: string
  icon: (props: IconProps) => ReactElement
  summary: string
  description: string
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'crowns',
    title: 'Crowns',
    icon: Crown,
    summary: 'Full-coverage restorations matched to natural tooth shade and bite.',
    description:
      'Custom-milled and layered crowns built to restore strength and a natural appearance, with shade matched in our dedicated studio for a seamless fit alongside your patient’s existing teeth.',
  },
  {
    slug: 'bridges',
    title: 'Bridges',
    icon: Bridge,
    summary: 'Multi-unit restorations that close gaps with a precise, comfortable fit.',
    description:
      'Engineered for accurate margins and long-term stability, our bridges are fabricated to fit first time, every time — reducing chair-side adjustments and remakes.',
  },
  {
    slug: 'veneers',
    title: 'Veneers',
    icon: Veneer,
    summary: 'Thin, lifelike layers for aesthetic cases that demand precision.',
    description:
      'Hand-finished veneers crafted with attention to translucency and texture, designed in collaboration with you to meet each patient’s aesthetic goals.',
  },
  {
    slug: 'implants',
    title: 'Implants',
    icon: Implant,
    summary: 'Implant-supported restorations built to exacting clinical tolerances.',
    description:
      'From single-unit crowns to full-arch restorations, our implant work is produced to precise specifications in partnership with your treatment plan.',
  },
]
