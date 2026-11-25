// M07 Hero: H1, lead, up to two actions, image slot.
import type { ReactNode } from "react";
import { PhotoSlot } from "~/components/Tbc/Tbc";
import styles from "./Hero.module.css";

export function Hero({
  title,
  lead,
  actions,
  after,
  photo,
  image,
  slim,
}: {
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  after?: ReactNode;
  /** Label for the development-only photo placeholder. */
  photo?: string;
  /** A real photo (eager, high priority — the only image not lazy-loaded). */
  image?: { src: string; alt: string; width: number; height: number };
  slim?: boolean;
}) {
  const media = image ? (
    <img
      className={styles.image}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      fetchPriority="high"
      decoding="async"
    />
  ) : photo ? (
    <PhotoSlot label={photo} className={styles.slot} />
  ) : null;
  const hasMedia = Boolean(image) || (Boolean(photo) && import.meta.env.DEV);

  return (
    <div className={[styles.hero, slim ? styles.slim : ""].join(" ")}>
      <div className={["container", styles.inner, hasMedia ? styles.withMedia : ""].join(" ")}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          {lead ? <p className={`lead ${styles.lead}`}>{lead}</p> : null}
          {actions}
          {after}
        </div>
        {hasMedia ? <div className={styles.media}>{media}</div> : null}
      </div>
    </div>
  );
}
