import { PDCACycle } from '../../components/illustrations/PDCACycle'
import './ProcessSection.css'

const STEPS = [
  {
    letter: 'P',
    title: 'Plan',
    description: 'We review your case file, shade references and clinical notes before any work begins.',
  },
  {
    letter: 'D',
    title: 'Do',
    description: 'Our technicians design and fabricate the restoration to your exact specification.',
  },
  {
    letter: 'C',
    title: 'Check',
    description: 'Every piece is inspected for fit, contact and shade accuracy before it leaves the lab.',
  },
  {
    letter: 'A',
    title: 'Act',
    description: 'Feedback from chair-side try-in is fed back into the next case — continuous improvement, by design.',
  },
]

export function ProcessSection() {
  return (
    <div>
      <div className="process-header">
        <div className="process-cycle-wrap">
          <PDCACycle />
        </div>
        <div className="section-heading process-heading">
          <h2>Plan. Do. Check. Act.</h2>
          <p>
            It&apos;s baked into our name — our Singapore dental lab runs on the
            same quality cycle dentists trust their own clinics with.
          </p>
        </div>
      </div>
      <div className="process-grid">
        {STEPS.map((step, index) => (
          <div className="process-step" key={step.letter}>
            <span className={`process-letter process-letter--${step.letter.toLowerCase()}`}>{step.letter}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index < STEPS.length - 1 && <span className="process-arrow" aria-hidden="true">&rarr;</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
