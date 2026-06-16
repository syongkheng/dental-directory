import type { ReactNode } from 'react'
import './Card.css'

export interface CardProps {
  icon?: ReactNode
  title: string
  children?: ReactNode
  footer?: ReactNode
  className?: string
}

export function Card({ icon, title, children, footer, className }: CardProps) {
  return (
    <div className={['card', className].filter(Boolean).join(' ')}>
      {icon && <div className="card-icon">{icon}</div>}
      <h3>{title}</h3>
      {children}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
