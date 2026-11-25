// About page copy.
import { tbc } from "~/lib/tbc";
import { visitInvite } from "./shared";

export const about = {
  hero: {
    title: "About PDCA",
    lead: "Patrick Dental Ceramic Arts Pte Ltd was founded on 4 May 2004. We are dedicated to the dentists we work with and the patients they treat.",
    more: tbc("About text from earlier projects"),
    photo: "the lab at work (team photos optional)",
  },
  values: {
    title: "What we value",
    items: ["Teamwork", "Commitment", "Professionalism", "Growing our technicians"],
  },
  team: {
    title: "The team",
    founder: {
      title: "Mr Patrick, founder",
      text: "Straumann-certified instructor.",
      bio: tbc("Short bio"),
      photo: "founder (optional)",
    },
    technicians: {
      title: "Our technicians",
      text: "More than half of our technicians are iTero-trained and certified.",
      bio: tbc("Technician bios"),
    },
  },
  photos: {
    title: "Our lab",
    /** Real photos from PDCA's Google Business Profile (TBC). Empty in production = section removed. */
    images: [] as { src: string; alt: string; width: number; height: number }[],
    placeholders: ["Lab photo 1", "Lab photo 2", "Lab photo 3", "Lab photo 4", "Lab photo 5", "Lab photo 6"],
  },
  visit: {
    title: "Come and see us",
    lead: visitInvite,
    photo: "reception at Vertex Tower A",
  },
  careersTeaser: {
    title: "Careers",
    text: "Responsible, experienced technicians make good restorations.",
    link: "See the careers page",
  },
};
