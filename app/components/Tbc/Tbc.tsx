// M29-adjacent helper: renders Copy values and TBC chips (see app/lib/tbc.ts).
import type { ElementType, ReactNode } from "react";
import { hasCopy, isTbc, type Copy } from "~/lib/tbc";
import styles from "./Tbc.module.css";

export function TbcChip({ label }: { label: string }) {
  return <span className={styles.chip}>TBC: {label}</span>;
}

/** Inline renderer for a Copy value. */
export function CopyText({ value }: { value: Copy | undefined | null }): ReactNode {
  if (value == null) return null;
  if (!isTbc(value)) return value;
  if (import.meta.env.DEV) return <TbcChip label={value.label} />;
  return value.fallback ?? null;
}

/** Renders `value` inside `as` (default <p>), or nothing at all when there is nothing to show. */
export function CopyBlock({
  value,
  as: Tag = "p",
  className,
}: {
  value: Copy | undefined | null;
  as?: ElementType;
  className?: string;
}) {
  if (!hasCopy(value)) return null;
  return (
    <Tag className={className}>
      <CopyText value={value} />
    </Tag>
  );
}

/** Development-only placeholder for a photo slot (warm neutral block with a short label). */
export function PhotoSlot({ label, className }: { label: string; className?: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className={`${styles.photo} ${className ?? ""}`} role="img" aria-label={`Placeholder: ${label}`}>
      <TbcChip label={`Photo: ${label}`} />
    </div>
  );
}
