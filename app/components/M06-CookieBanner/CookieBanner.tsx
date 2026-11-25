// M06 Cookie banner. Accept and Decline have equal prominence. Never rendered on /insights.
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ui } from "~/content/nav";
import { buttonClass } from "~/components/ui/Button";
import { useConsent } from "./ConsentProvider";
import styles from "./CookieBanner.module.css";

export function CookieBanner() {
  const { choice, bannerOpen, accept, decline, setBannerHeight, settingsRequest } = useConsent();
  const ref = useRef<HTMLElement>(null);

  // Reopened from "Cookie settings": move focus to the banner so it is clearly the thing that opened.
  useEffect(() => {
    if (settingsRequest > 0 && bannerOpen) ref.current?.focus();
  }, [settingsRequest, bannerOpen]);

  useEffect(() => {
    const el = ref.current;
    if (!bannerOpen || !el) {
      setBannerHeight(0);
      return;
    }
    const ro = new ResizeObserver(() => setBannerHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [bannerOpen, setBannerHeight]);

  if (!bannerOpen) return null;

  return (
    <section
      // A new key on each "Cookie settings" click replays the entrance highlight.
      key={settingsRequest}
      ref={ref}
      tabIndex={-1}
      className={[styles.banner, settingsRequest > 0 ? styles.reopened : "", "no-print"].join(" ")}
      aria-label={ui.cookie.label}
      data-testid="cookie-banner"
    >
      <p className={styles.text}>
        {ui.cookie.text} <Link to="/privacy">{ui.cookie.privacyLink}</Link>
        {choice === "granted" || choice === "denied" ? (
          <span className={styles.current} data-testid="cookie-current">
            {choice === "granted" ? ui.cookie.currentGranted : ui.cookie.currentDenied}
          </span>
        ) : null}
      </p>
      <div className={styles.actions}>
        <button type="button" className={buttonClass("secondary", styles.btn)} onClick={accept} aria-pressed={choice === "granted"}>
          {ui.cookie.accept}
        </button>
        <button type="button" className={buttonClass("secondary", styles.btn)} onClick={decline} aria-pressed={choice === "denied"}>
          {ui.cookie.decline}
        </button>
      </div>
    </section>
  );
}

/** "Cookie settings" control used in the footer and on the Privacy page. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" className={className} onClick={openSettings}>
      {ui.footer.cookieSettings}
    </button>
  );
}
