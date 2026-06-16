import type { ReactNode } from 'react'
import './Section.css'

export interface SectionProps {
  id?: string
  tone?: 'base' | 'alt'
  className?: string
  children: ReactNode
}

/** Wraps page content in a consistent full-bleed band + centered container. */
export function Section({ id, tone = 'base', className, children }: SectionProps) {
  const classes = ['section', `section-${tone}`, className].filter(Boolean).join(' ')
  return (
    <section id={id} className={classes}>
      <div className="container">{children}</div>
    </section>
  )
}
