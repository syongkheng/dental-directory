// M08 Trust strip and Reasons (facts from the confirmed business facts only).
import type { ComponentType } from "react";
import type { IconProps } from "~/components/icons/types";
import { Award, Building, Calendar, Layers, Scan } from "~/components/icons/Extra";
import styles from "./TrustStrip.module.css";

const icons = {
  since: Calendar,
  clients: Building,
  materials: Layers,
  founder: Award,
  team: Scan,
} satisfies Record<string, ComponentType<IconProps>>;

export interface TrustItem {
  icon: keyof typeof icons;
  label: string;
  value: string;
}

export function TrustStrip({ items }: { items: readonly TrustItem[] }) {
  return (
    <div className="container">
      <ul className={styles.strip} role="list">
        {items.map((t) => {
          const Icon = icons[t.icon];
          return (
            <li key={t.label} className={styles.item}>
              <span className={styles.icon}>
                <Icon width={20} height={20} />
              </span>
              <span className={styles.label}>{t.label}</span>
              <span className={styles.value}>{t.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Reasons({ items }: { items: readonly { title: string; text: string }[] }) {
  return (
    <ul className={styles.reasons} role="list">
      {items.map((r) => (
        <li key={r.title}>
          <h3>{r.title}</h3>
          <p>{r.text}</p>
        </li>
      ))}
    </ul>
  );
}
