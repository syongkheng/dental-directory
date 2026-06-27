import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Lab, WhatsAppIcon } from '../components/icons'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { SERVICES } from '../data/services'
import { WHATSAPP_URL } from '../constants'
import './Services.css'

export function Services() {
  return (
    <>
      <Section>
        <div className="services-hero">
          <div className="services-hero-inner">
            <span className="hero-eyebrow">Our Services</span>
            <h1>Restorations built to fit, first time.</h1>
            <p>
              We work directly with dentists and clinics — not patients — to
              produce ceramic restorations to your exact specification. Every
              case passes through our Plan–Do–Check–Act quality cycle before
              it ships.
            </p>
            <div className="services-hero-chips">
              {SERVICES.map((service) => (
                <span key={service.slug} className="services-hero-chip">
                  <service.icon width={16} height={16} />
                  {service.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="services-detail-grid">
          {SERVICES.map((service) => (
            <Card
              key={service.slug}
              icon={<service.icon />}
              title={service.title}
              watermark={<service.icon />}
              footer={
                <span className="service-turnaround">
                  Typical turnaround: {service.turnaround}
                </span>
              }
            >
              <p>{service.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="studio-highlight">
          <div>
            <h2>Shade-Taking & Custom Aesthetics</h2>
            <p>
              Our dedicated shade-taking studio lets us capture accurate
              color references for high-aesthetic cases, so the restoration
              that arrives at your chair matches what you and your patient
              expect — with minimal try-in adjustment.
            </p>
            <div className="studio-actions">
              <Button to="/contact">Discuss Your Case</Button>
              <Button
                href={WHATSAPP_URL}
                variant="outline"
                target="_blank"
                rel="noreferrer"
                icon={<WhatsAppIcon />}
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
          <PlaceholderImage label="Photo: shade-taking studio at PDCA" icon={<Lab />} />
        </div>
      </Section>

      <Section tone="alt">
        <div className="services-enquiry">
          <h2>Questions about your specific case?</h2>
          <p>
            Contact us directly — we&apos;re happy to walk through case
            requirements, materials, and turnaround times for your situation.
            We respond within one business day.
          </p>
          <div className="services-enquiry-actions">
            <Button to="/contact">Request a Quote</Button>
            <Button
              href={WHATSAPP_URL}
              variant="outline"
              target="_blank"
              rel="noreferrer"
              icon={<WhatsAppIcon />}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
