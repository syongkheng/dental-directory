// M12 Turnaround rule: large "7" and "10" with labels and the counting rule. Used on Home, Services, For Dentists.
import { site } from "~/content/site";
import styles from "./Turnaround.module.css";

export function Turnaround({ compact }: { compact?: boolean }) {
  const t = site.turnaround;
  return (
    <div className={[styles.tat, compact ? styles.compact : ""].join(" ")}>
      <dl className={styles.figures}>
        <div>
          <dt className="visually-hidden">Simple cases</dt>
          <dd>
            <span className={styles.big}>{t.simpleDays}</span>
            <span className={styles.label}>{t.simpleLabel}</span>
          </dd>
        </div>
        <div>
          <dt className="visually-hidden">Complex cases</dt>
          <dd>
            <span className={styles.big}>{t.complexDays}</span>
            <span className={styles.label}>{t.complexLabel}</span>
          </dd>
        </div>
      </dl>
      <p className={styles.rule}>{t.rule}</p>
    </div>
  );
}
