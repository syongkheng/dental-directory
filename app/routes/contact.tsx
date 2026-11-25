import { flags } from "~/config/flags";
import { contact } from "~/content/pages/contact";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { ContactCards } from "~/components/M03-ContactCards/ContactCards";
import { MapAndDirections } from "~/components/M04-MapAndDirections/MapAndDirections";
import { VisitTheLab } from "~/components/M17-VisitTheLab/VisitTheLab";
import { EnquiryForm } from "~/components/M21-EnquiryForm/EnquiryForm";
import { Section } from "~/components/ui/Section";
import styles from "./pages.module.css";

export default function Contact() {
  const c = contact;
  return (
    <>
      <Seo page={seo.contact} path="/contact" />
      <div className={`container ${styles.pageHead}`}>
        <h1>{c.title}</h1>
        <p className="lead">{c.lead}</p>
      </div>
      <section className="container" aria-labelledby="ways-title">
        <h2 id="ways-title" className="visually-hidden">
          {c.cardsTitle}
        </h2>
        <ContactCards />
      </section>

      <Section id="visit-or-send" titleId="visit-or-send-title" className="">
        <MapAndDirections title={c.visitOrSend.title} titleId="visit-or-send-title" loc="contact_map" />
      </Section>

      <VisitTheLab id="visit" title={c.arrangeVisit.title} lead={c.arrangeVisit.lead} tone="sand" />

      {flags.enquiryForm ? (
        <Section id="message" title={c.form.title}>
          <EnquiryForm />
        </Section>
      ) : null}
    </>
  );
}
