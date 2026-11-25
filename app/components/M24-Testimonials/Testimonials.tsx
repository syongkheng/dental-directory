// M24 Testimonials (flagged). Renders nothing until there are real quotes from dentists.
import { flags } from "~/config/flags";
import { home } from "~/content/pages/home";
import { Section } from "~/components/ui/Section";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const { title, quotes } = home.testimonials;
  if (!flags.testimonials || quotes.length === 0) return null;
  return (
    <Section id="testimonials" title={title}>
      <ul className={styles.list} role="list">
        {quotes.map((q) => (
          <li key={q.name}>
            <figure className={styles.quote}>
              <blockquote>
                <p>{q.quote}</p>
              </blockquote>
              <figcaption>
                {q.name}, {q.clinic}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
