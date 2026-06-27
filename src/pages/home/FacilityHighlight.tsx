import { CheckCircle } from '../../components/icons'
import { LabIllustration } from '../../components/illustrations/LabIllustration'
import './FacilityHighlight.css'

const POINTS = [
  'Dedicated shade-taking studio for accurate, repeatable color matching',
  'Three times the production space of our previous facility',
  'On-site training and rest areas for our dental technicians',
  'Direct case consultations — call or WhatsApp us on the same day',
  'Free remakes if a restoration deviates from your submitted specification',
]

export function FacilityHighlight() {
  return (
    <div className="facility">
      <div className="facility-visual">
        <div className="facility-illustration-wrap">
          <LabIllustration />
        </div>
      </div>
      <div className="facility-copy">
        <h2>Our Singapore facility, built for precision</h2>
        <p>
          In 2022 we moved into a larger Singapore dental lab facility —
          three times the size of our previous space, purpose-built with a
          dedicated shade-taking studio and training facilities for our
          dental technicians.
        </p>
        <ul>
          {POINTS.map((point) => (
            <li key={point}>
              <CheckCircle />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
