import { describe, expect, it } from "vitest";
import { floatKeyForPath, WHATSAPP_MESSAGES, whatsappHref, type WhatsAppKey } from "../whatsapp";
import { mapLinks } from "../maps";
import { copyText, hasCopy, tbc } from "../tbc";
import { readConsent, writeConsent, CONSENT_KEY } from "../consent";
import { bucketFor } from "../breakpoints";
import { validateEnquiry } from "~/components/M21-EnquiryForm/validate";

describe("whatsappHref()", () => {
  it.each(Object.keys(WHATSAPP_MESSAGES) as WhatsAppKey[])("encodes the %s message and uses 6568423371", (key) => {
    const href = whatsappHref(key);
    expect(href.startsWith("https://wa.me/6568423371?text=")).toBe(true);
    const text = new URL(href).searchParams.get("text");
    expect(text).toBe(WHATSAPP_MESSAGES[key]);
    expect(href).not.toMatch(/ /);
  });
  it("encodes apostrophes-safe text exactly", () => {
    expect(whatsappHref("dentistCase")).toBe(
      `https://wa.me/6568423371?text=${encodeURIComponent("Hi PDCA, I'm a dentist and I'd like to discuss a case.")}`,
    );
  });
  it("picks the floating button message per page", () => {
    expect(floatKeyForPath("/")).toBe("dentistCase");
    expect(floatKeyForPath("/services")).toBe("dentistCase");
    expect(floatKeyForPath("/dentists/")).toBe("dentistCase");
    expect(floatKeyForPath("/patients")).toBe("patient");
    expect(floatKeyForPath("/about")).toBe("general");
    expect(floatKeyForPath("/contact")).toBe("general");
    expect(floatKeyForPath("/privacy")).toBe("general");
  });
});

describe("map links", () => {
  const q = encodeURIComponent("Vertex Tower A, 33 Ubi Avenue 3, #08-52/53, Singapore 408868");
  it("builds the four URLs from the address string", () => {
    expect(mapLinks.google).toBe(`https://www.google.com/maps/search/?api=1&query=${q}`);
    expect(mapLinks.apple).toBe(`https://maps.apple.com/?q=${q}`);
    expect(mapLinks.waze).toBe(`https://waze.com/ul?q=${q}&navigate=yes`);
    expect(mapLinks.embed).toBe(`https://www.google.com/maps?q=${q}&output=embed`);
  });
});

describe("tbc()", () => {
  const withFallback = tbc("Opening hours", "Mon–Fri");
  const noFallback = tbc("Founder bio");
  it("shows a chip label in development", () => {
    expect(copyText(noFallback, true)).toBe("TBC: Founder bio");
    expect(hasCopy(noFallback, true)).toBe(true);
  });
  it("falls back or disappears in production", () => {
    expect(copyText(withFallback, false)).toBe("Mon–Fri");
    expect(copyText(noFallback, false)).toBe("");
    expect(hasCopy(noFallback, false)).toBe(false);
    expect(hasCopy(withFallback, false)).toBe(true);
  });
  it("passes final text through", () => {
    expect(copyText("Final", false)).toBe("Final");
  });
});

describe("consent storage", () => {
  it("round-trips the stored choice", () => {
    localStorage.clear();
    expect(readConsent()).toBeNull();
    writeConsent("granted");
    expect(readConsent()?.analytics).toBe("granted");
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!).ts).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    writeConsent("denied");
    expect(readConsent()?.analytics).toBe("denied");
  });
  it("ignores malformed values", () => {
    localStorage.setItem(CONSENT_KEY, "{oops");
    expect(readConsent()).toBeNull();
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: "maybe" }));
    expect(readConsent()).toBeNull();
  });
});

describe("screen buckets", () => {
  it("matches the layout breakpoints", () => {
    expect(bucketFor(360)).toMatchObject({ key: "sm", size: "small" });
    expect(bucketFor(460)).toMatchObject({ key: "sm" });
    expect(bucketFor(800)).toMatchObject({ key: "md", size: "medium" });
    expect(bucketFor(1000)).toMatchObject({ key: "lg", size: "large" });
    expect(bucketFor(1440)).toMatchObject({ key: "xl", size: "large" });
  });
});

describe("validateEnquiry()", () => {
  const ok = { name: "Dr Tan", clinic: "", phone: "", email: "tan@example.com", message: "Hello", consent: true, website: "" };
  it("accepts a valid enquiry", () => {
    expect(validateEnquiry(ok)).toEqual({});
  });
  it("requires name, a way to reply, message and consent", () => {
    expect(validateEnquiry({ ...ok, name: " ", email: "", message: "", consent: false })).toEqual({
      name: true,
      contact: true,
      message: true,
      consent: true,
    });
  });
  it("checks email and phone formats", () => {
    expect(validateEnquiry({ ...ok, email: "nope" }).email).toBe(true);
    expect(validateEnquiry({ ...ok, email: "", phone: "12" }).phone).toBe(true);
    expect(validateEnquiry({ ...ok, email: "", phone: "+65 6842 3371" })).toEqual({});
  });
});
