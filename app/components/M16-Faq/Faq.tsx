// M16 FAQ: native <details>/<summary>; one component, two data sets (dentists, patients).
import type { FaqItem } from "~/content/faq";
import { hasCopy } from "~/lib/tbc";
import { CopyText } from "~/components/Tbc/Tbc";
import { Chevron } from "~/components/icons";
import styles from "./Faq.module.css";

export function Faq({ items }: { items: FaqItem[] }) {
  const visible = items.filter((i) => hasCopy(i.a));
  return (
    <div className={styles.faq}>
      {visible.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.q}>
            <span>{item.q}</span>
            <Chevron className={styles.chev} width={20} height={20} />
          </summary>
          <p className={styles.a}>
            <CopyText value={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
