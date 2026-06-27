import { useRef, useState, type FormEvent } from 'react'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { LocationMap } from '../components/LocationMap'
import { Pin, Phone, Mail, WhatsAppIcon } from '../components/icons'
import { Analytics } from '../analytics/events'
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CONTACT_EMAIL,
  CONTACT_FORM_ENDPOINT,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from '../constants'
import './Contact.css'

const SERVICE_OPTIONS = ['Crowns', 'Bridges', 'Veneers', 'Implants']

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasStarted = useRef(false)

  function handleFirstFocus() {
    if (!hasStarted.current) {
      hasStarted.current = true
      Analytics.formStart('contact')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const data = new FormData(event.currentTarget)
    const fields: Record<string, string | string[]> = {}
    data.forEach((value, key) => {
      if (key !== 'services') fields[key] = value as string
    })
    const services = data.getAll('services') as string[]
    if (services.length > 0) fields.services = services

    Analytics.formSubmit('contact', {
      services,
      caseVolume: fields.caseVolume ?? '',
      hasMessage: Boolean(fields.message),
    })

    if (CONTACT_FORM_ENDPOINT) {
      try {
        const res = await fetch(CONTACT_FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(fields),
        })
        if (!res.ok) throw new Error('Submission failed')
        Analytics.formSuccess('contact')
        setSubmitted(true)
      } catch {
        const msg = 'Something went wrong — please try WhatsApp or email us directly.'
        Analytics.formError('contact', 'fetch_failed')
        setError(msg)
      } finally {
        setLoading(false)
      }
      return
    }

    // Mailto fallback until CONTACT_FORM_ENDPOINT is configured
    const name = (fields.name as string) ?? ''
    const clinic = (fields.clinic as string) ?? ''
    const subject = `Lab enquiry from ${name}${clinic ? ` (${clinic})` : ''}`
    const body = [
      `Name: ${name}`,
      `Clinic: ${clinic || '—'}`,
      `Email: ${(fields.email as string) ?? ''}`,
      `Phone: ${(fields.phone as string) || '—'}`,
      `Services: ${services.length ? services.join(', ') : '—'}`,
      `Monthly case volume: ${(fields.caseVolume as string) || '—'}`,
      ``,
      `Message:`,
      `${(fields.message as string) ?? ''}`,
    ].join('\n')

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    Analytics.formSuccess('contact')
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <Section>
      <div className="page-intro">
        <span className="hero-eyebrow">Contact</span>
        <h1>Let&apos;s discuss your case load.</h1>
        <p>
          Reach out via WhatsApp for the fastest response, or send us the
          details below and we&apos;ll get back to you within one business
          day.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-details">
          <ul className="contact-list">
            <li>
              <Pin />
              <span>
                {ADDRESS_LINE_1}
                <br />
                {ADDRESS_LINE_2}
              </span>
            </li>
            <li>
              <Phone />
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                {WHATSAPP_NUMBER}
              </a>
            </li>
            <li>
              <Mail />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
          <Button
            href={WHATSAPP_URL}
            variant="accent"
            target="_blank"
            rel="noreferrer"
            icon={<WhatsAppIcon />}
            className="contact-whatsapp-cta"
            trackComponent="Contact"
          >
            Chat on WhatsApp
          </Button>
          <LocationMap />
        </div>

        <form className="contact-form" onSubmit={handleSubmit} onFocus={handleFirstFocus}>
          {submitted ? (
            <p className="form-success">
              Thanks &mdash; we&apos;ve received your message and will be in touch
              shortly.
            </p>
          ) : (
            <>
              <label>
                Name
                <input type="text" name="name" required />
              </label>
              <label>
                Clinic / Practice Name
                <input type="text" name="clinic" />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" />
              </label>
              <div className="form-group">
                <span className="form-group-label">Services needed</span>
                <div className="form-checkboxes">
                  {SERVICE_OPTIONS.map((s) => (
                    <label key={s} className="form-checkbox-label">
                      <input type="checkbox" name="services" value={s} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <label>
                Monthly case volume (approximate)
                <select name="caseVolume">
                  <option value="">Select&hellip;</option>
                  <option value="1-5">1&ndash;5 cases</option>
                  <option value="6-20">6&ndash;20 cases</option>
                  <option value="21-50">21&ndash;50 cases</option>
                  <option value="50+">50+ cases</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={4} required />
              </label>
              {error && <p className="form-error">{error}</p>}
              <Button type="submit" disabled={loading} trackComponent="Contact">
                {loading ? 'Sending…' : 'Send Message'}
              </Button>
            </>
          )}
        </form>
      </div>
    </Section>
  )
}
