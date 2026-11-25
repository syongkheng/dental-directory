// M05 Footer
import { Link } from "react-router";
import { mainNav, ui } from "~/content/nav";
import { site, socialLinks } from "~/content/site";
import { CopyBlock } from "~/components/Tbc/Tbc";
import { Logo } from "~/components/M01-SiteHeader/Logo";
import { CookieSettingsButton } from "~/components/M06-CookieBanner/CookieBanner";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const social = socialLinks();
  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <Logo className={styles.mark} />
            <span>{site.name}</span>
          </Link>
          <p className={styles.muted}>{site.tagline}.</p>
        </div>

        <nav aria-label={ui.footer.pages}>
          <h2 className={styles.heading}>{ui.footer.pages}</h2>
          <ul role="list" className={styles.list}>
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>{ui.footer.contact}</h2>
          <address className={styles.address}>
            <p>{site.address.full}</p>
            <p>
              <a href={site.phone.href} data-loc="footer">
                {site.phone.display}
              </a>
              <br />
              <a href={site.email.href} data-loc="footer">
                {site.email.address}
              </a>
            </p>
            <CopyBlock value={site.openingHours} />
          </address>
        </div>

        <div>
          {social.length > 0 ? (
            <>
              <h2 className={styles.heading}>{ui.footer.follow}</h2>
              <ul role="list" className={styles.list}>
                {social.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                      <span className="visually-hidden"> {ui.opensInNewTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <h2 className={`${styles.heading} ${social.length > 0 ? styles.spaced : ""}`}>{ui.footer.legal}</h2>
          <ul role="list" className={styles.list}>
            <li>
              <Link to="/privacy">{ui.footer.privacy}</Link>
            </li>
            <li>
              <CookieSettingsButton className={styles.linkButton} />
            </li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.fine}`}>
        © {new Date().getFullYear()} {site.legalName}
      </div>
    </footer>
  );
}
