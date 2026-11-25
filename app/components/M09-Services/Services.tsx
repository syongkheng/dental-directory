// M09 Services catalogue: summary cards on Home; full sections on Services.
import { Link } from "react-router";
import type { ServiceItem } from "~/content/pages/services";
import { Arrow } from "~/components/icons";
import { CopyBlock, PhotoSlot } from "~/components/Tbc/Tbc";
import styles from "./Services.module.css";

export function ServicesSummary({
  cards,
}: {
  cards: readonly { title: string; text: string; anchor: string }[];
}) {
  return (
    <ul className={styles.summary} role="list">
      {cards.map((c) => (
        <li key={c.anchor}>
          <Link to={`/services#${c.anchor}`} className={styles.summaryCard}>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <Arrow className={styles.arrow} width={20} height={20} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ServiceSection({ item, tone }: { item: ServiceItem; tone: "paper" | "sand" }) {
  const showPhoto = import.meta.env.DEV;
  return (
    <section
      id={item.id}
      className={[styles.section, tone === "sand" ? styles.sand : ""].join(" ")}
      aria-labelledby={`${item.id}-title`}
    >
      <div className={["container", styles.row, showPhoto ? styles.withPhoto : ""].join(" ")}>
        {showPhoto ? <PhotoSlot label={item.photo} className={styles.photo} /> : null}
        <div className={styles.body}>
          <h2 id={`${item.id}-title`}>{item.title}</h2>
          {item.text.map((t) => (
            <p key={t} className={styles.text}>
              {t}
            </p>
          ))}
          {item.tags?.length ? (
            <ul className={styles.tags} role="list">
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : null}
          <CopyBlock value={item.extra} className={styles.text} />
        </div>
      </div>
    </section>
  );
}
