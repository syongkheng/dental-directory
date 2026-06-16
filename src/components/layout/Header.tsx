import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Tooth, Menu, WhatsAppIcon } from '../icons'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/Button'
import { MobileNav } from './MobileNav'
import { NAV_LINKS } from './navLinks'
import { WHATSAPP_URL } from '../../constants'
import './Header.css'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
            <Tooth />
            <span>PDCA</span>
          </Link>

          <nav className="primary-nav" aria-label="Primary">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a
              href={WHATSAPP_URL}
              className="header-whatsapp"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with us on WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <Button to="/contact" className="header-cta">
              Request a Quote
            </Button>
            <button
              type="button"
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered as a sibling, not a descendant, of <header>: backdrop-filter
          on .site-header would otherwise create a containing block for this
          fixed-position panel and break full-viewport coverage. */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
