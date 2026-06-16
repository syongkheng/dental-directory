import { Section } from '../components/ui/Section'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { Cycle } from '../components/icons'
import './About.css'

const TIMELINE = [
  { year: '2004', title: 'PDCA founded', description: 'Patrick Dental Ceramic Arts opens its first lab in Singapore.' },
  { year: '2022', title: 'New facility', description: 'Moved into a facility three times larger, with a dedicated shade-taking studio.' },
  { year: 'Today', title: 'Singapore + Jakarta', description: 'A team of skilled technicians serving clinics across both markets.' },
]

export function About() {
  return (
    <>
      <Section>
        <div className="page-intro">
          <span className="hero-eyebrow">About PDCA</span>
          <h1>Two decades of ceramic craftsmanship.</h1>
          <p>
            Founded in 2004, Patrick Dental Ceramic Arts (PDCA) has grown
            from a small Singapore lab into a trusted restoration partner
            for dental clinics across Singapore and Jakarta — built on
            teamwork, technician development, and a relentless focus on fit.
          </p>
        </div>
      </Section>

      <Section tone="alt">
        <div className="about-mission">
          <PlaceholderImage label="Photo: PDCA technician team at work" />
          <div>
            <h2>Our mission</h2>
            <p>
              We exist to give dentists a restoration partner they don&apos;t
              have to double-check — precise fit, accurate shade, and
              dependable turnaround, every case.
            </p>
            <div className="about-process-tag">
              <Cycle />
              <span>Plan. Do. Check. Act. — it&apos;s in our name.</span>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="section-heading">
          <h2>Our story so far</h2>
        </div>
        <ol className="timeline">
          {TIMELINE.map((item) => (
            <li key={item.year}>
              <span className="timeline-year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
