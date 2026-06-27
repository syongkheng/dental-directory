import { Section } from '../components/ui/Section'
import { PDCACycle } from '../components/illustrations/PDCACycle'
import { Cycle } from '../components/icons'
import './About.css'

const TIMELINE = [
  { year: '2004', title: 'PDCA founded', description: 'Patrick Dental Ceramic Arts opens its first lab in Singapore.' },
  { year: '2022', title: 'New facility', description: 'Moved into a facility three times larger, with a dedicated shade-taking studio.' },
  { year: 'Today', title: 'Singapore-wide reach', description: 'A growing team of skilled technicians serving dental clinics across Singapore.' },
]

export function About() {
  return (
    <>
      <Section>
        <div className="about-hero">
          <div className="about-hero-copy">
            <span className="hero-eyebrow">About PDCA</span>
            <h1>Two decades of ceramic craftsmanship.</h1>
            <p>
              Founded in 2004, Patrick Dental Ceramic Arts (PDCA) has grown
              from a small Singapore lab into a trusted restoration partner
              for dental clinics across Singapore — built on
              teamwork, technician development, and a relentless focus on fit.
            </p>
            <div className="about-process-tag">
              <Cycle />
              <span>Plan. Do. Check. Act. — it&apos;s in our name.</span>
            </div>
          </div>
          <div className="about-hero-visual" aria-hidden="true">
            <PDCACycle />
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="about-mission">
          <div className="about-mission-stat">
            <span className="about-mission-stat-value">21+</span>
            <span className="about-mission-stat-label">Years serving Singapore</span>
            <div className="about-mission-stat-bar" />
            <p className="about-mission-tagline">
              We exist to give dentists a restoration partner they don&apos;t
              have to double-check — precise fit, accurate shade, and
              dependable turnaround, every case.
            </p>
          </div>
          <div className="about-mission-copy">
            <h2>Our mission</h2>
            <p>
              We exist to give dentists a restoration partner they don&apos;t
              have to double-check — precise fit, accurate shade, and
              dependable turnaround, every case.
            </p>
            <p>
              At PDCA, the name says it all. Every restoration travels through
              our Plan–Do–Check–Act quality cycle before it leaves the lab,
              and every chair-side observation feeds back into the next case.
            </p>
            <p>
              We&apos;re proud to be 100% Singapore-based — your cases never
              leave our facility and never leave Singapore.
            </p>
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
