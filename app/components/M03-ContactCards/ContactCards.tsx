// M03 Contact block: WhatsApp (primary), Call, Email. Number and address always shown as text too.
import { contact } from "~/content/pages/contact";
import { labels } from "~/content/pages/shared";
import { site } from "~/content/site";
import { Mail, Phone } from "~/components/icons";
import { ButtonAnchor, WhatsAppButton } from "~/components/ui/Button";
import { Card, CardGrid } from "~/components/ui/Card";
import styles from "./ContactCards.module.css";

export function ContactCards() {
  return (
    <CardGrid cols={3}>
      <Card as="li" title={contact.cards.whatsapp} emphasis>
        <p className={styles.value}>{site.whatsapp.display}</p>
        <div className={styles.action}>
          <WhatsAppButton waKey="general" loc="contact_card">
            {labels.startChat}
          </WhatsAppButton>
        </div>
      </Card>
      <Card as="li" title={contact.cards.call}>
        <p className={styles.value}>{site.phone.display}</p>
        <div className={styles.action}>
          <ButtonAnchor href={site.phone.href} variant="secondary" loc="contact_card" icon={<Phone width={20} height={20} />}>
            {labels.call}
          </ButtonAnchor>
        </div>
      </Card>
      <Card as="li" title={contact.cards.email}>
        <p className={`${styles.value} ${styles.small}`}>{site.email.address}</p>
        <div className={styles.action}>
          <ButtonAnchor href={site.email.href} variant="secondary" loc="contact_card" icon={<Mail width={20} height={20} />}>
            {labels.emailUs}
          </ButtonAnchor>
        </div>
      </Card>
    </CardGrid>
  );
}
