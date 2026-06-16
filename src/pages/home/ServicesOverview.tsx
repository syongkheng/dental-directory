import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { SERVICES } from '../../data/services'
import './ServicesOverview.css'

export function ServicesOverview() {
  return (
    <div>
      <div className="section-heading">
        <h2>What we craft</h2>
        <p>Four core restoration types, produced to fit first time.</p>
      </div>
      <div className="services-grid">
        {SERVICES.map((service) => (
          <Card
            key={service.slug}
            icon={<service.icon />}
            title={service.title}
            footer={<Link to="/services">Learn more &rarr;</Link>}
          >
            <p>{service.summary}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
