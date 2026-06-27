import type { ReactNode } from 'react'
import './Card.css'

export interface CardProps {
  icon?: ReactNode
  title: string
  children?: ReactNode
  footer?: ReactNode
  watermark?: ReactNode
  className?: string
}

export function Card({ icon, title, children, footer, watermark, className }: CardProps) {
  return (
    <div className={['card', className].filter(Boolean).join(' ')}>
      {watermark && <div className="card-watermark" aria-hidden="true">{watermark}</div>}
      {icon && <div className="card-icon">{icon}</div>}
      <h3>{title}</h3>
      {children}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
