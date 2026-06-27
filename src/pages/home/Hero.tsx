import { WhatsAppIcon, CheckCircle } from '../../components/icons'
import { Button } from '../../components/ui/Button'
import { HeroIllustration } from '../../components/illustrations/HeroIllustration'
import { WHATSAPP_URL } from '../../constants'
import './Hero.css'

const HIGHLIGHTS = [
  '21+ years serving Singapore dental clinics',
  'In-house shade-taking studio',
  'Restorations returned in 5–14 working days',
  'Free remakes if fit or shade deviates from spec',
]

export function Hero() {
  return (
    <div className="hero">
      <div className="hero-copy">
        <span className="hero-eyebrow">Dental laboratory in Singapore</span>
        <h1>Singapore&apos;s trusted dental ceramic laboratory since 2004.</h1>
        <p className="hero-sub">
          Patrick Dental Ceramic Arts (PDCA) is a full-service dental
          laboratory in Singapore, producing precision crowns, bridges,
          veneers and implants for dental clinics — built to fit first
          time, every time.
        </p>
        <div className="hero-actions">
          <Button to="/contact">Request a Quote</Button>
          <Button
            href={WHATSAPP_URL}
            variant="outline"
            target="_blank"
            rel="noreferrer"
            icon={<WhatsAppIcon />}
          >
            Chat on WhatsApp
          </Button>
        </div>
        <ul className="hero-highlights">
          {HIGHLIGHTS.map((item) => (
            <li key={item}>
              <CheckCircle />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-visual">
        <div className="hero-illustration-wrap">
          <HeroIllustration />
        </div>
        <div className="hero-badge-row">
          <div className="hero-badge">
            <span className="hero-badge-value">21+</span>
            <span className="hero-badge-label">Years</span>
          </div>
          <div className="hero-badge">
            <span className="hero-badge-flag" aria-hidden="true">🇸🇬</span>
            <span className="hero-badge-label">Made in Singapore</span>
          </div>
        </div>
      </div>
    </div>
  )
}
