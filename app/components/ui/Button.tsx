// Shared buttons. Primary = clay pill; secondary = outline. All targets ≥ 44 × 44 px.
import type { ReactNode } from "react";
import { Link } from "react-router";
import { whatsappHref, type WhatsAppKey } from "~/lib/whatsapp";
import { WhatsAppIcon } from "~/components/icons";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";

export function buttonClass(variant: Variant = "primary", extra?: string) {
  return [styles.btn, variant === "primary" ? styles.primary : styles.secondary, extra].filter(Boolean).join(" ");
}

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
}

/** Internal route link styled as a button. */
export function ButtonLink({ to, children, variant, icon, className }: CommonProps & { to: string }) {
  return (
    <Link to={to} className={buttonClass(variant, className)}>
      {icon}
      <span>{children}</span>
    </Link>
  );
}

/** External / protocol link (tel:, mailto:, maps) styled as a button. Tracking via data-* attributes. */
export function ButtonAnchor({
  href,
  children,
  variant,
  icon,
  className,
  loc,
  app,
  download,
  newTab,
}: CommonProps & { href: string; loc?: string; app?: string; download?: boolean; newTab?: boolean }) {
  return (
    <a
      href={href}
      className={buttonClass(variant, className)}
      data-loc={loc}
      data-app={app}
      download={download || undefined}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}

/** WhatsApp button: opens wa.me with the message for `waKey`; counted as whatsapp_click. */
export function WhatsAppButton({
  waKey,
  loc,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: {
  waKey: WhatsAppKey;
  loc: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={whatsappHref(waKey)}
      className={buttonClass(variant, className)}
      data-loc={loc}
      data-wa={waKey}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <WhatsAppIcon width={20} height={20} />
      <span>{children}</span>
    </a>
  );
}

export function Actions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.actions, className].filter(Boolean).join(" ")}>{children}</div>;
}
