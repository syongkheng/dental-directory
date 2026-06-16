import { useState, type FormEvent } from 'react'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { Pin, Phone, Mail, WhatsAppIcon } from '../components/icons'
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from '../constants'
import './Contact.css'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // TODO: wire this up to a backend/email service once one is chosen.
    console.log('Contact form submission', Object.fromEntries(data))
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
          >
            Chat on WhatsApp
          </Button>
          <PlaceholderImage label="Map: 33 Ubi Avenue 3, Vertex Tower A, Singapore" aspect="4/3" icon={<Pin />} />
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <p className="form-success">
              Thanks — we&apos;ve received your message and will be in touch
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
              <label>
                Message
                <textarea name="message" rows={4} required />
              </label>
              <Button type="submit">Send Message</Button>
            </>
          )}
        </form>
      </div>
    </Section>
  )
}
