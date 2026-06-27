import { CheckCircle } from '../../components/icons'
import './TrustStrip.css'

const PILLS = [
  '21+ years proven',
  'Singapore production',
  'Same-day WhatsApp',
  'Built to fit, first time',
]

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-strip-inner">
        <span className="trust-strip-label">Trusted by dental clinics across Singapore</span>
        <ul className="trust-pills">
          {PILLS.map((pill) => (
            <li key={pill} className="trust-pill">
              <CheckCircle />
              {pill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
