// M21 Enquiry form validation (pure, unit-tested).
export interface EnquiryValues {
  name: string;
  clinic: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  /** Honeypot: real visitors never fill this. */
  website: string;
}

export type EnquiryErrors = Partial<Record<"name" | "contact" | "email" | "phone" | "message" | "consent", true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\-\s\d]{8,20}$/;

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!v.name.trim()) e.name = true;
  const email = v.email.trim();
  const phone = v.phone.trim();
  if (!email && !phone) e.contact = true;
  if (email && !EMAIL.test(email)) e.email = true;
  if (phone && !PHONE.test(phone)) e.phone = true;
  if (!v.message.trim()) e.message = true;
  if (!v.consent) e.consent = true;
  return e;
}
