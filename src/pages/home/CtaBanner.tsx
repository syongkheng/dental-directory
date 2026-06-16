import { WhatsAppIcon } from '../../components/icons'
import { Button } from '../../components/ui/Button'
import { WHATSAPP_URL } from '../../constants'
import './CtaBanner.css'

export function CtaBanner() {
  return (
    <div className="cta-banner">
      <h2>Ready to partner with a lab that fits first time?</h2>
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
    </div>
  )
}
