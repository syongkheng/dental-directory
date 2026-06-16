import { NavLink } from 'react-router-dom'
import { Close, WhatsAppIcon } from '../icons'
import { Button } from '../ui/Button'
import { WHATSAPP_URL } from '../../constants'
import { NAV_LINKS } from './navLinks'
import './MobileNav.css'

export interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div className={open ? 'mobile-nav mobile-nav-open' : 'mobile-nav'}>
      <div className="mobile-nav-header">
        <span>Menu</span>
        <button type="button" aria-label="Close menu" onClick={onClose}>
          <Close />
        </button>
      </div>
      <nav aria-label="Mobile">
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mobile-nav-actions">
        <Button to="/contact" onClick={onClose}>
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
