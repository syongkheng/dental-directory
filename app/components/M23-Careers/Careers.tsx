// M23 Careers: flagged page content and the About teaser. No upload form: apply by email or WhatsApp.
import { Link } from "react-router";
import { flags } from "~/config/flags";
import { about } from "~/content/pages/about";
import { careers } from "~/content/pages/misc";
import { hasCopy } from "~/lib/tbc";
import { CopyBlock, CopyText } from "~/components/Tbc/Tbc";
import { Card, CardGrid, cardStyles } from "~/components/ui/Card";
import { Section } from "~/components/ui/Section";
import styles from "./Careers.module.css";

export function CareersContent() {
  return (
    <>
      <Section titleId="careers-why">
        <h2 id="careers-why" className="visually-hidden">
          {careers.whyTitle}
        </h2>
        <CardGrid cols={3}>
          {careers.why
            .filter((w) => hasCopy(w.text))
            .map((w) => (
              <Card as="li" key={w.title} title={w.title}>
                <CopyBlock value={w.text} className={cardStyles.text} />
              </Card>
            ))}
        </CardGrid>
      </Section>
      <Section id="openings" tone="sand" title={careers.openingsTitle}>
        <ul className={styles.openings} role="list">
          {careers.openings.map((o) => (
            <li key={o.title} className={styles.opening}>
              <div>
                <h3>{o.title}</h3>
                <p className={cardStyles.text}>{o.meta}</p>
              </div>
              <CopyText value={o.status} />
            </li>
          ))}
        </ul>
        <p className={styles.apply}>{careers.apply}</p>
      </Section>
    </>
  );
}

export function CareersTeaser() {
  if (!flags.careers) return null;
  const t = about.careersTeaser;
  return (
    <Section id="careers-teaser" title={t.title}>
      <p className="lead">{t.text}</p>
      <p className={styles.apply}>
        <Link to="/careers">{t.link}</Link>
      </p>
    </Section>
  );
}
