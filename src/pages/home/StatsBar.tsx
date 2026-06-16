import { StatCard } from '../../components/ui/StatCard'
import './StatsBar.css'

const STATS = [
  { value: '21+', label: 'Years in dental ceramics' },
  { value: '2', label: 'Production labs — Singapore & Jakarta' },
  { value: '11–50', label: 'Skilled technicians on staff' },
  { value: '4', label: 'Core restoration types' },
]

export function StatsBar() {
  return (
    <div className="stats-bar">
      {STATS.map((stat) => (
        <StatCard key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  )
}
