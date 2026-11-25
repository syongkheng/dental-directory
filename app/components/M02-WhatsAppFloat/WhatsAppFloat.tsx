// M02 Floating WhatsApp button
import { useLocation } from "react-router";
import { ui } from "~/content/nav";
import { WhatsAppIcon } from "~/components/icons";
import { floatKeyForPath, whatsappHref } from "~/lib/whatsapp";
import { useConsent } from "~/components/M06-CookieBanner/ConsentProvider";
import styles from "./WhatsAppFloat.module.css";

export function WhatsAppFloat() {
  const { pathname } = useLocation();
  const { bannerOpen, bannerHeight } = useConsent();
  const key = floatKeyForPath(pathname);
  return (
    <a
      href={whatsappHref(key)}
      className={`${styles.float} no-print`}
      style={{ bottom: bannerOpen ? `calc(${bannerHeight}px + 1.5rem)` : undefined }}
      data-loc="float"
      data-wa={key}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.whatsappFloatLabel}
    >
      <WhatsAppIcon width={22} height={22} />
      <span className={styles.label}>{ui.whatsappFloat}</span>
    </a>
  );
}
