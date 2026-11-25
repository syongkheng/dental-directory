import { services } from "~/content/pages/services";
import { labels, materialsCopy, turnaroundCopy, workflowsServices } from "~/content/pages/shared";
import { seo } from "~/content/seo";
import { site } from "~/content/site";
import { Seo } from "~/components/M29-Seo/Seo";
import { ServiceSection } from "~/components/M09-Services/Services";
import { Materials } from "~/components/M10-Materials/Materials";
import { Workflows } from "~/components/M11-Workflows/Workflows";
import { Turnaround } from "~/components/M12-Turnaround/Turnaround";
import { Phone } from "~/components/icons";
import { Actions, ButtonAnchor, WhatsAppButton } from "~/components/ui/Button";
import { Section } from "~/components/ui/Section";
import styles from "./pages.module.css";

export default function Services() {
  const s = services;
  return (
    <>
      <Seo page={seo.services} path="/services" />
      <div className={`container ${styles.pageHead}`}>
        <h1>{s.title}</h1>
        <p className="lead">{s.lead}</p>
        <nav aria-label={s.onThisPage}>
          <ul className={styles.innav} role="list">
            {s.nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {s.items.map((item, i) => (
        <ServiceSection key={item.id} item={item} tone={i % 2 === 0 ? "sand" : "paper"} />
      ))}

      <Section id="materials" tone="sand" title={materialsCopy.title} lead={materialsCopy.lead}>
        <Materials />
      </Section>

      <Section id="workflows" title={workflowsServices.title}>
        <Workflows items={workflowsServices.items} />
      </Section>

      <Section id="turnaround" tone="sand" title={turnaroundCopy.title}>
        <Turnaround />
      </Section>

      <Section id="discuss" title={s.cta.title}>
        <Actions>
          <WhatsAppButton waKey="prices" loc="cta">
            {labels.whatsappUs}
          </WhatsAppButton>
          <ButtonAnchor href={site.phone.href} variant="secondary" loc="cta" icon={<Phone width={20} height={20} />}>
            {labels.callNumber}
          </ButtonAnchor>
        </Actions>
      </Section>
    </>
  );
}
