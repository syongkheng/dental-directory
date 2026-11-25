// TBC helper: every unknown fact is represented with tbc(label, fallback?).
// Development: rendered as a visible yellow "TBC: <label>" chip (see components/Tbc).
// Production: rendered as the fallback if given; otherwise nothing, and the surrounding block is dropped.
// `npm run tbc` lists every tbc("…") call with its file and line.

export interface TbcValue {
  readonly __tbc: true;
  readonly label: string;
  readonly fallback?: string;
}

/** A piece of copy that is either final text or a TBC placeholder. */
export type Copy = string | TbcValue;

export function tbc(label: string, fallback?: string): TbcValue {
  return { __tbc: true, label, fallback };
}

export function isTbc(v: unknown): v is TbcValue {
  return typeof v === "object" && v !== null && (v as TbcValue).__tbc === true;
}

const DEV = import.meta.env.DEV;

/** True when this copy will render something in the current mode. */
export function hasCopy(v: Copy | undefined | null, dev = DEV): boolean {
  if (v == null) return false;
  if (!isTbc(v)) return v.length > 0;
  return dev || Boolean(v.fallback);
}

/** Plain-text value (prod: final text, fallback or ""; dev: "TBC: label" for unknowns). */
export function copyText(v: Copy | undefined | null, dev = DEV): string {
  if (v == null) return "";
  if (!isTbc(v)) return v;
  return dev ? `TBC: ${v.label}` : (v.fallback ?? "");
}
