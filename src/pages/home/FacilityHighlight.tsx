import { CheckCircle } from '../../components/icons'
import { PlaceholderImage } from '../../components/PlaceholderImage'
import './FacilityHighlight.css'

const POINTS = [
  'Dedicated shade-taking studio for accurate, repeatable color matching',
  'Three times the production space of our previous facility',
  'On-site training and rest areas for our technician team',
  'A second lab in Jakarta to support regional case volume',
]

export function FacilityHighlight() {
  return (
    <div className="facility">
      <div className="facility-visual">
        <PlaceholderImage label="Photo: PDCA's shade-taking studio and lab floor" />
      </div>
      <div className="facility-copy">
        <h2>A facility built for precision</h2>
        <p>
          In 2022 we moved into a facility three times larger than our
          previous space — purpose-built with a dedicated shade-taking
          studio and dedicated training facilities for our technicians.
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
