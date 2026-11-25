// M17 Visit the lab: invitation and a WhatsApp button with the visit message.
import type { ReactNode } from "react";
import { labels } from "~/content/pages/shared";
import { PhotoSlot } from "~/components/Tbc/Tbc";
import { Actions, WhatsAppButton } from "~/components/ui/Button";
import { Section, Split } from "~/components/ui/Section";
import styles from "./VisitTheLab.module.css";

export function VisitTheLab({
  id,
  title,
  lead,
  photo,
  tone = "paper",
  photoFirst,
  children,
}: {
  id: string;
  title: string;
  lead: string;
  photo?: string;
  tone?: "paper" | "sand";
  photoFirst?: boolean;
  children?: ReactNode;
}) {
  const text = (
    <div>
      <h2 id={`${id}-title`} className={styles.title}>
        {title}
      </h2>
      <p className="lead">{lead}</p>
      {children}
      <Actions>
        <WhatsAppButton waKey="visit" loc="visit">
          {labels.whatsappVisit}
        </WhatsAppButton>
      </Actions>
    </div>
  );
  const media = photo && import.meta.env.DEV ? <PhotoSlot label={photo} /> : null;
  return (
    <Section id={id} tone={tone} titleId={`${id}-title`}>
      <Split reverse={photoFirst}>
        {photoFirst ? media : null}
        {text}
        {!photoFirst ? media : null}
      </Split>
    </Section>
  );
}
