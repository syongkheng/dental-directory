// FAQ data sets (M16). One component renders both.
import { tbc, type Copy } from "~/lib/tbc";

export interface FaqItem {
  q: string;
  a: Copy;
}

export const dentistFaq: FaqItem[] = [
  {
    q: "How long does a case take?",
    a: "7 working days for simple cases and 10 for complex ones, counted from the day we have complete instructions and all components. Collection and delivery days are not counted.",
  },
  {
    q: "How do I arrange a pickup?",
    a: "WhatsApp or call us. Same-day pickup if it fits our courier's route, otherwise the next working day.",
  },
  { q: "Which scan files do you accept?", a: "STL files from any intraoral scanner." },
  {
    q: "Which materials do you use?",
    a: "Amann Girrbach zirconia, Ivoclar IPS e.max lithium disilicate and VITA porcelain.",
  },
  {
    q: "What if a restoration needs a remake?",
    a: tbc("PDCA's remake policy", "Ask us about our remake and warranty terms on WhatsApp."),
  },
  { q: "How do I pay?", a: "By PayNow or bank transfer, after we send a Statement of Account." },
  { q: "Do you publish prices?", a: "Prices are on request. WhatsApp us with your clinic's name." },
];

export const patientFaq: FaqItem[] = [
  {
    q: "Can I order a crown from the lab directly?",
    a: "No. We make restorations to your dentist's prescription, so please speak to your dentist first.",
  },
  {
    q: "How long does the lab take?",
    a: "Usually 7 working days for simple cases and 10 for complex ones. Your dentist will confirm your appointment dates.",
  },
  {
    q: "Can I choose the material?",
    a: "Ask your dentist. They choose the material for your case and can tell you which brand it is.",
  },
];
