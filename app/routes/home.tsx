import { Link } from "react-router";
import { home } from "~/content/pages/home";
import { labels, workflowsHome } from "~/content/pages/shared";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { Hero } from "~/components/M07-Hero/Hero";
import { Reasons, TrustStrip } from "~/components/M08-TrustStrip/TrustStrip";
import { ServicesSummary } from "~/components/M09-Services/Services";
import { Workflows } from "~/components/M11-Workflows/Workflows";
import { Turnaround } from "~/components/M12-Turnaround/Turnaround";
import { VisitTheLab } from "~/components/M17-VisitTheLab/VisitTheLab";
import { Testimonials } from "~/components/M24-Testimonials/Testimonials";
import { PhotoSlot } from "~/components/Tbc/Tbc";
import { Actions, ButtonLink, WhatsAppButton } from "~/components/ui/Button";
import { Section, Split } from "~/components/ui/Section";
import styles from "./pages.module.css";

export default function Home() {
  const h = home;
  return (
    <>
      <Seo page={seo.home} path="/" />
      <Hero
        title={h.hero.title}
        lead={h.hero.lead}
        photo={h.hero.photo}
        actions={
          <Actions>
            <WhatsAppButton waKey="dentistCase" loc="hero">
              {labels.whatsappUs}
            </WhatsAppButton>
            <ButtonLink to="/contact#visit" variant="secondary">
              {labels.visitTheLab}
            </ButtonLink>
          </Actions>
        }
        after={
          <p className={styles.aside}>
            {h.hero.asidePrefix} <Link to="/patients">{h.hero.asideLink}</Link>
          </p>
        }
      />
      <TrustStrip items={h.trust} />

      <Section id="what-we-make" title={h.services.title} lead={h.services.lead}>
        <ServicesSummary cards={h.services.cards} />
      </Section>

      <Section id="workflows" tone="sand" title={workflowsHome.title}>
        <Workflows items={workflowsHome.items} />
        <Turnaround />
      </Section>

      <Section id="why-dentists" title={h.reasons.title}>
        <Reasons items={h.reasons.items} />
      </Section>

      <Section id="patients-band" tone="sand" titleId="patients-band-title">
        <Split>
          <div>
            <h2 id="patients-band-title" className={styles.h2}>
              {h.patientBand.title}
            </h2>
            <p className="lead">{h.patientBand.lead}</p>
            <Actions>
              <ButtonLink to="/patients" variant="secondary">
                {labels.forPatients}
              </ButtonLink>
            </Actions>
          </div>
          {import.meta.env.DEV ? <PhotoSlot label={h.patientBand.photo} /> : null}
        </Split>
      </Section>

      <VisitTheLab id="visit-the-lab" title={h.visit.title} lead={h.visit.lead} photo={h.visit.photo} photoFirst />
      <Testimonials />
    </>
  );
}
