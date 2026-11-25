// For Dentists page copy.
import { tbc, type Copy } from "~/lib/tbc";
import type { WhatsAppKey } from "~/lib/whatsapp";

export interface CardCopy {
  title: string;
  text: Copy[];
  whatsapp?: { key: WhatsAppKey; label: string };
}

export const dentists = {
  hero: {
    title: "Working with PDCA",
    lead: "For dentists, specialists, institutions and clinic groups.",
    photo: "case box with prescription form",
  },
  sendCase: {
    title: "Send us a case",
    cards: [
      {
        title: "Physical impressions",
        text: [
          "WhatsApp or call us to arrange a pickup. If it fits our courier's route we collect the same day; otherwise on the next working day.",
        ],
        whatsapp: { key: "pickup", label: "WhatsApp for a pickup" },
      },
      {
        title: "Digital scans",
        text: [
          "STL files from any intraoral scanner.",
          tbc(
            "How to send STL files: email, transfer link or scanner portal",
            "WhatsApp us and we'll tell you how to send your files.",
          ),
        ],
      },
      { title: "Prescriptions", text: ["Please write prescriptions in English."] },
    ] satisfies CardCopy[],
  },
  rx: {
    title: "Prescription form",
    text: "Print it, fill it in and send it with the case.",
    tbcLabel: "Rx form PDF (public/files/pdca-rx-form.pdf)",
  },
  turnaround: {
    title: "Turnaround",
  },
  terms: {
    title: "Prices, remakes and payment",
    cards: [
      {
        title: "Prices on request",
        text: ["WhatsApp us with your clinic's name and we'll send our price list."],
        whatsapp: { key: "prices", label: "Ask for prices" },
      },
      {
        title: "Remakes and warranty",
        text: [tbc("PDCA's remake and warranty wording", "Ask us about our remake and warranty terms on WhatsApp.")],
      },
      {
        title: "Payment",
        text: ["We send a Statement of Account by WhatsApp or email. Pay by PayNow or bank transfer."],
      },
    ] satisfies CardCopy[],
  },
  inPerson: {
    title: "Work with us in person",
    cards: [
      {
        title: "Dentists and their teams",
        text: ["Visit the lab to work on a case together, or to see how we fabricate."],
      },
      {
        title: "Students and educators",
        text: [
          "NUS postgraduate students visit to learn how a lab works. Educators can arrange a visit for a cohort.",
          tbc("What PDCA offers students"),
        ],
        whatsapp: { key: "students", label: "Arrange a student visit" },
      },
      {
        title: "Institutions, groups and labs",
        text: [
          "We work with dentists from private clinics and government institutions.",
          tbc("Anything specific for institutions, clinic groups or partner labs"),
        ],
      },
    ] satisfies CardCopy[],
  },
  faq: {
    title: "Questions dentists ask",
  },
};
