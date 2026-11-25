// M01 Header and navigation
import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { mainNav, ui } from "~/content/nav";
import { site } from "~/content/site";
import { WhatsAppButton } from "~/components/ui/Button";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the menu on navigation (adjusting state during render, not in an effect).
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Esc closes the menu and returns focus to the Menu button; clicks outside close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!navRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <Logo className={styles.mark} />
          <span className={styles.full}>{site.name}</span>
          <span className={styles.short} aria-hidden="true">
            {site.shortName}
          </span>
        </Link>

        <nav
          ref={navRef}
          id={menuId}
          className={[styles.nav, open ? styles.open : ""].join(" ")}
          aria-label={ui.mainNavLabel}
        >
          <ul role="list">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={styles.link}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.end}>
          <WhatsAppButton waKey="dentistCase" loc="header" className={styles.wa}>
            <span className={styles.waLong}>{ui.whatsappHeader}</span>
            <span className={styles.waShort}>{ui.whatsappHeaderShort}</span>
          </WhatsAppButton>
          <button
            ref={buttonRef}
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? ui.closeMenu : ui.menu}
          </button>
        </div>
      </div>
    </header>
  );
}
