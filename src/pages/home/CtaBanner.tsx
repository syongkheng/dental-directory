import { WhatsAppIcon } from '../../components/icons'
import { Button } from '../../components/ui/Button'
import { WHATSAPP_URL } from '../../constants'
import './CtaBanner.css'

export function CtaBanner() {
  return (
    <div className="cta-banner">
      {/* Decorative dot-grid overlay */}
      <svg className="cta-banner-pattern" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" fillOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-dots)" />
      </svg>

      <p className="cta-banner-proof">21+ years &middot; 100% Singapore &middot; Built to fit</p>
      <h2>Ready to partner with Singapore&apos;s precision dental lab?</h2>
      <p>Tell us about your case load — we&apos;ll get back to you within one business day.</p>
      <div className="cta-banner-actions">
        <Button to="/contact" variant="accent">
          Request a Quote
        </Button>
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
      <p className="cta-banner-reassurance">No commitment needed — we respond within one business day.</p>
    </div>
  )
}
