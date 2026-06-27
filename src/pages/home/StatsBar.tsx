import { Crown, Pin, Tooth, Cycle } from '../../components/icons'
import { StatCard } from '../../components/ui/StatCard'
import './StatsBar.css'

const STATS = [
  { value: '21+', label: 'Years as a Singapore dental lab', icon: <Tooth /> },
  { value: '100%', label: 'Singapore-based production', icon: <Pin /> },
  { value: '5–14', label: 'Working days, typical turnaround', icon: <Cycle /> },
  { value: '4', label: 'Core restoration types', icon: <Crown /> },
]

export function StatsBar() {
  return (
    <div className="stats-bar">
      {STATS.map((stat) => (
        <StatCard key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} />
      ))}
    </div>
  )
}
