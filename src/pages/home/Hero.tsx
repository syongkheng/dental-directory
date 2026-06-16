import { WhatsAppIcon, CheckCircle } from '../../components/icons'
import { Button } from '../../components/ui/Button'
import { PlaceholderImage } from '../../components/PlaceholderImage'
import { WHATSAPP_URL } from '../../constants'
import heroLogoMark from '../../assets/hero-logo-mark.jpg'
import './Hero.css'

const HIGHLIGHTS = [
  '21+ years serving Singapore dental clinics',
  'In-house shade-taking studio',
  'Singapore & Jakarta production labs',
]

export function Hero() {
  return (
    <div className="hero">
      <div className="hero-copy">
        <span className="hero-eyebrow">Dental Laboratory · Singapore</span>
        <h1>Precision ceramics, trusted by dentists since 2004.</h1>
        <p className="hero-sub">
          Patrick Dental Ceramic Arts is a full-service dental laboratory
          producing crowns, bridges, veneers and implants for clinics across
          Singapore and Jakarta — built to fit first time, every time.
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
        <PlaceholderImage
          src={heroLogoMark}
          label="Patrick Dental Ceramic Arts logo mark"
          aspect="4/3"
        />
      </div>
    </div>
  )
}
