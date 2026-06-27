import type { ReactNode } from 'react'
import './StatCard.css'

export interface StatCardProps {
  value: string
  label: string
  icon?: ReactNode
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
