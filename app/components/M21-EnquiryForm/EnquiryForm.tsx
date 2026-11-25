// M21 Enquiry form. Rendered only when VITE_ENQUIRY_ENDPOINT is set (qindom POST /pdca/enquiry).
// qindom emails admin@pdcadental.com and sends the automatic reply. Personal data never goes in URLs.
import { useId, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ENQUIRY_ENDPOINT, flags } from "~/config/flags";
import { contact } from "~/content/pages/contact";
import { site } from "~/content/site";
import { track } from "~/lib/track";
import { buttonClass, WhatsAppButton, ButtonAnchor } from "~/components/ui/Button";
import { validateEnquiry, type EnquiryErrors, type EnquiryValues } from "./validate";
import styles from "./EnquiryForm.module.css";

type Status = "idle" | "sending" | "success" | "error";

const EMPTY: EnquiryValues = { name: "", clinic: "", phone: "", email: "", message: "", consent: false, website: "" };

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const f = contact.form;

  if (!flags.enquiryForm) return null;

  const set = <K extends keyof EnquiryValues>(k: K, v: EnquiryValues[K]) => setValues((s) => ({ ...s, [k]: v }));
  const id = (k: string) => `${uid}-${k}`;
  const errId = (k: string) => `${uid}-${k}-err`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        body: JSON.stringify({
          name: values.name.trim(),
          clinic: values.clinic.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          consent: values.consent,
          website: values.website,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(EMPTY);
      track("generate_lead", { form: "enquiry" });
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const fieldError = (k: keyof EnquiryErrors) =>
    errors[k] ? (
      <span id={errId(k)} className={styles.error}>
        {f.errors[k]}
      </span>
    ) : null;

  const contactMissing = Boolean(errors.contact);

  return (
    <>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className={styles.status}>
        {status === "success" ? <p className={styles.success}>{f.success}</p> : null}
        {status === "error" ? (
          <div className={styles.failure}>
            <p>{f.error}</p>
            <div className={styles.fallback}>
              <WhatsAppButton waKey="general" loc="enquiry_error">
                WhatsApp
              </WhatsAppButton>
              <ButtonAnchor href={site.email.href} variant="secondary" loc="enquiry_error">
                {site.email.address}
              </ButtonAnchor>
            </div>
          </div>
        ) : null}
      </div>

      {status !== "success" ? (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          {Object.keys(errors).length ? (
            <p className={styles.summary} role="alert">
              {f.errorSummary}
            </p>
          ) : null}

          <div className={styles.field}>
            <label htmlFor={id("name")}>{f.name}</label>
            <input
              id={id("name")}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? errId("name") : undefined}
              required
            />
            {fieldError("name")}
          </div>

          <div className={styles.field}>
            <label htmlFor={id("clinic")}>{f.clinic}</label>
            <input
              id={id("clinic")}
              name="clinic"
              autoComplete="organization"
              value={values.clinic}
              onChange={(e) => set("clinic", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={id("phone")}>{f.phone}</label>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={errors.phone || contactMissing ? true : undefined}
              aria-describedby={
                [errors.phone ? errId("phone") : "", contactMissing ? errId("contact") : ""].filter(Boolean).join(" ") ||
                undefined
              }
            />
            {fieldError("phone")}
          </div>

          <div className={styles.field}>
            <label htmlFor={id("email")}>{f.email}</label>
            <input
              id={id("email")}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={errors.email || contactMissing ? true : undefined}
              aria-describedby={
                [errors.email ? errId("email") : "", contactMissing ? errId("contact") : ""].filter(Boolean).join(" ") ||
                undefined
              }
            />
            {fieldError("email")}
          </div>
          {contactMissing ? <p className={`${styles.full} ${styles.error}`}>{fieldError("contact")}</p> : null}

          <div className={`${styles.field} ${styles.full}`}>
            <label htmlFor={id("message")}>{f.message}</label>
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? errId("message") : undefined}
              required
            />
            {fieldError("message")}
          </div>

          {/* Honeypot: hidden from people and assistive tech. */}
          <div className={styles.hp} aria-hidden="true">
            <label htmlFor={id("website")}>{f.honeypot}</label>
            <input
              id={id("website")}
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
            />
          </div>

          <div className={`${styles.full} ${styles.check}`}>
            <input
              id={id("consent")}
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? errId("consent") : undefined}
              required
            />
            <label htmlFor={id("consent")}>
              {f.consentBefore}
              <Link to="/privacy">{f.consentLink}</Link>
              {f.consentAfter}
            </label>
            {fieldError("consent")}
          </div>

          <div className={`${styles.full} ${styles.submitRow}`}>
            <button type="submit" className={buttonClass("primary")} disabled={status === "sending"}>
              {status === "sending" ? f.sending : f.submit}
            </button>
            <p className={styles.note}>{f.replyNote}</p>
          </div>
        </form>
      ) : null}
    </>
  );
}
