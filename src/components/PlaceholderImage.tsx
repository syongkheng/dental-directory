import type { ReactNode } from 'react'
import { Lab } from './icons'
import './PlaceholderImage.css'

export interface PlaceholderImageProps {
  /** Real photo URL, once available. Falls back to the placeholder when omitted. */
  src?: string
  /** Describes what real photo should eventually go here. */
  label: string
  aspect?: '4/3' | '1/1' | '16/9'
  icon?: ReactNode
}

/**
 * Named "image slot" used everywhere a real PDCA photo will eventually go
 * (lab, team, facility, restorations). Drop in a `src` later to replace the
 * placeholder without touching any layout code.
 */
export function PlaceholderImage({
  src,
  label,
  aspect = '4/3',
  icon,
}: PlaceholderImageProps) {
  if (src) {
    return <img className="placeholder-image" src={src} alt={label} style={{ aspectRatio: aspect }} />
  }

  return (
    <div
      className="placeholder-image placeholder-image-empty"
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={label}
    >
      {icon ?? <Lab />}
      <span>{label}</span>
    </div>
  )
}
