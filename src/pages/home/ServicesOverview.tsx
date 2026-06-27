import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { SERVICES } from '../../data/services'
import './ServicesOverview.css'

export function ServicesOverview() {
  return (
    <div>
      <div className="section-heading">
        <h2>Dental restorations we craft in Singapore</h2>
        <p>
          Four core ceramic dental restoration types — crowns, bridges,
          veneers and implants — produced to fit first time, every time.
        </p>
        <div className="section-heading-rule" aria-hidden="true" />
      </div>
      <div className="services-grid">
        {SERVICES.map((service) => (
          <Card
            key={service.slug}
            icon={<service.icon />}
            title={service.title}
            watermark={<service.icon />}
            footer={<Link to="/services">Learn more &rarr;</Link>}
          >
            <p>{service.summary}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
