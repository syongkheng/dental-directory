import { Link } from 'react-router-dom'
import { Tooth, Pin, Phone, Mail, WhatsAppIcon } from '../icons'
import { NAV_LINKS } from './navLinks'
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  COMPANY_NAME,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from '../../constants'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <Tooth />
            <span>PDCA</span>
          </div>
          <p>
            Precision ceramic dental restorations — crowns, bridges, veneers
            and implants — crafted for dentists across Singapore and Jakarta
            since 2004.
          </p>
        </div>

        <div className="footer-col">
          <h3>Sitemap</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Get in touch</h3>
          <ul className="footer-contact">
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
            <li>
              <WhatsAppIcon />
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          &copy; {year} {COMPANY_NAME} Pte Ltd. All rights reserved.
        </span>
        <span>Singapore &middot; Jakarta</span>
      </div>
    </footer>
  )
}
