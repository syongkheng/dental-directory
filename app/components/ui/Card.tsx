// Card and card grid. White surface, 1 px stone border, shadow used sparingly.
import type { ReactNode } from "react";
import type { CardCopy } from "~/content/pages/dentists";
import { hasCopy } from "~/lib/tbc";
import { CopyBlock } from "~/components/Tbc/Tbc";
import { WhatsAppButton } from "./Button";
import styles from "./Card.module.css";

export function Card({
  title,
  children,
  emphasis,
  className,
  as: Tag = "div",
}: {
  title?: ReactNode;
  children?: ReactNode;
  emphasis?: boolean;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag className={[styles.card, emphasis ? styles.emphasis : "", className].filter(Boolean).join(" ")}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {children}
    </Tag>
  );
}

export function CardGrid({ children, cols = 3, className }: { children: ReactNode; cols?: 2 | 3 | 4; className?: string }) {
  return (
    <ul className={[styles.grid, styles[`cols${cols}`], className].filter(Boolean).join(" ")} role="list">
      {children}
    </ul>
  );
}

/** Renders a list of CardCopy items (title, paragraphs which may be TBC, optional WhatsApp button). */
export function CopyCards({ cards, loc }: { cards: CardCopy[]; loc: string }) {
  return (
    <CardGrid cols={3}>
      {cards.map((c) => (
        <Card as="li" key={c.title} title={c.title}>
          {c.text.filter((t) => hasCopy(t)).map((t, i) => (
            <CopyBlock key={i} value={t} className={styles.text} />
          ))}
          {c.whatsapp ? (
            <div className={styles.cardAction}>
              <WhatsAppButton waKey={c.whatsapp.key} loc={loc} variant="secondary">
                {c.whatsapp.label}
              </WhatsAppButton>
            </div>
          ) : null}
        </Card>
      ))}
    </CardGrid>
  );
}

export const cardStyles = styles;
