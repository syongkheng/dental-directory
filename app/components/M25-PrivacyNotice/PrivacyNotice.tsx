// M25 Privacy notice. The "draft wording" note is visible in development only.
import { privacy } from "~/content/pages/privacy";
import { CopyBlock } from "~/components/Tbc/Tbc";
import { buttonClass } from "~/components/ui/Button";
import { CookieSettingsButton } from "~/components/M06-CookieBanner/CookieBanner";
import styles from "./PrivacyNotice.module.css";

export function PrivacyNotice() {
  return (
    <div className={`container ${styles.wrap}`}>
      <h1 className={styles.title}>{privacy.title}</h1>
      {import.meta.env.DEV ? <p className={styles.draft}>{privacy.draftNote}</p> : null}
      {privacy.sections.map((s) => (
        <section key={s.title} className={styles.section}>
          <h2>{s.title}</h2>
          {s.text.map((t, i) => (
            <CopyBlock key={i} value={t} />
          ))}
          {s.list ? (
            <ul className={styles.list}>
              {s.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {s.after?.map((t, i) => (
            <CopyBlock key={i} value={t} />
          ))}
        </section>
      ))}
      <section className={styles.section}>
        <h2>{privacy.choices.title}</h2>
        <p>{privacy.choices.text}</p>
        <CookieSettingsButton className={buttonClass("secondary", styles.settings)} />
      </section>
      <section className={styles.section}>
        <h2>{privacy.dpo.title}</h2>
        <CopyBlock value={privacy.dpo.text} />
      </section>
    </div>
  );
}
