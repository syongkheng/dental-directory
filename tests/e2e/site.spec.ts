import { expect, test, type Page } from "@playwright/test";
import { ANALYTICS_HOST, ENQUIRY_URL } from "../../playwright.config";

const ROUTES = ["/", "/services", "/dentists", "/patients", "/about", "/contact", "/privacy"];

async function dismissConsent(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("pdca.consent.v1", JSON.stringify({ analytics: "denied", ts: new Date().toISOString() }));
  });
}

test.describe("public routes", () => {
  test("every route returns 200 directly with a unique title, description, canonical and one h1", async ({ page, request }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const path of ROUTES) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      const html = await res.text();
      // Pre-rendered: the real title and h1 are in the HTML before any JS runs.
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
      const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
      expect(title, path).not.toBe("");
      expect(html).toContain(`<link rel="canonical" href="https://pdcadental.com${path === "/" ? "/" : path}"/>`);
      titles.add(title);
      descriptions.add(desc);

      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(title);
    }
    expect(titles.size).toBe(ROUTES.length);
    expect(descriptions.size).toBe(ROUTES.length);
  });

  for (const width of [360, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await dismissConsent(page);
      await page.setViewportSize({ width, height: 900 });
      for (const path of ROUTES) {
        await page.goto(path);
        const sw = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(sw, path).toBeLessThanOrEqual(width);
      }
    });
  }

  test("unknown path shows the Not found page", async ({ page }) => {
    await page.goto("/no-such-page");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    await expect(main.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
    await expect(main.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });

  test("sitemap and robots", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const p of ROUTES) expect(sitemap).toContain(`<loc>https://pdcadental.com${p === "/" ? "/" : p}</loc>`);
    expect(sitemap).not.toContain("insights");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://pdcadental.com/sitemap.xml");
    expect(robots).not.toContain("insights");
  });

  test("no price appears anywhere", async ({ request }) => {
    for (const path of ROUTES) {
      const html = await (await request.get(path)).text();
      expect(html, path).not.toMatch(/S?\$\s?\d/);
    }
  });
});

test.describe("header menu", () => {
  test("opens, closes with Esc and returns focus at 390px", async ({ page }) => {
    await dismissConsent(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Menu" });
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    const btn = page.locator("header button[aria-controls]");
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(btn).toBeFocused();
    await expect(nav.getByRole("link", { name: "Services" })).toBeHidden();
  });

  test("marks the current page", async ({ page }) => {
    await dismissConsent(page);
    await page.goto("/about");
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

test.describe("consent and analytics (qindom collect)", () => {
  async function watchCollect(page: Page) {
    const hits: string[] = [];
    await page.route(`${ANALYTICS_HOST}/**`, async (route) => {
      hits.push(route.request().postData() ?? "");
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"code":200}' });
    });
    const thirdParty: string[] = [];
    page.on("request", (r) => {
      if (/googletagmanager|google-analytics/.test(r.url())) thirdParty.push(r.url());
    });
    return { hits, thirdParty };
  }

  test("nothing is sent before consent; Accept starts sending page views and link events", async ({ page }) => {
    const { hits, thirdParty } = await watchCollect(page);
    await page.goto("/services");
    await expect(page.getByTestId("cookie-banner")).toBeVisible();
    await page.waitForTimeout(400);
    expect(hits).toHaveLength(0);

    await page.getByRole("button", { name: "Accept" }).click();
    await expect(page.getByTestId("cookie-banner")).toBeHidden();
    await expect.poll(() => hits.length).toBeGreaterThan(0);
    const first = JSON.parse(hits[0]);
    expect(first).toMatchObject({ v: 1, system: "dental-directory", event: "page_view", page: "/services" });
    expect(first.properties.visitorId).toBeTruthy();

    await page.context().route("https://wa.me/**", (r) => r.abort());
    await page.locator('a[data-loc="cta"][data-wa="prices"]').click();
    await expect
      .poll(() => hits.map((h) => JSON.parse(h)).find((e) => e.event === "whatsapp_click"))
      .toMatchObject({ properties: { location: "cta", message_key: "prices" } });
    expect(thirdParty).toHaveLength(0);
  });

  test("Decline never sends; Cookie settings reopens the banner", async ({ page }) => {
    const { hits } = await watchCollect(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Decline" }).click();
    await expect(page.getByTestId("cookie-banner")).toBeHidden();
    await page.goto("/about");
    await page.waitForTimeout(400);
    expect(hits).toHaveLength(0);

    await page.getByRole("contentinfo").getByRole("button", { name: "Cookie settings" }).click();
    await expect(page.getByTestId("cookie-banner")).toBeVisible();
    await expect(page.getByTestId("cookie-banner")).toBeFocused();
    await expect(page.getByTestId("cookie-current")).toHaveText("You currently don't allow visit counting.");
    await expect(page.getByRole("button", { name: "Decline" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: "Accept" })).toBeVisible();

    // Choosing closes the banner and returns focus to the Cookie settings button.
    await page.getByRole("button", { name: "Accept" }).click();
    await expect(page.getByTestId("cookie-banner")).toBeHidden();
    await expect(page.getByRole("contentinfo").getByRole("button", { name: "Cookie settings" })).toBeFocused();

    // The Privacy page's own Cookie settings button reopens it too.
    await page.goto("/privacy");
    await page.getByRole("main").getByRole("button", { name: "Cookie settings" }).click();
    await expect(page.getByTestId("cookie-current")).toHaveText("You currently allow visit counting.");
  });
});

test.describe("contact links", () => {
  test("WhatsApp, tel and mailto targets", async ({ page }) => {
    await dismissConsent(page);
    await page.goto("/contact");
    const wa = page.locator('a[data-loc="contact_card"][href^="https://wa.me/"]');
    await expect(wa).toHaveAttribute(
      "href",
      `https://wa.me/6568423371?text=${encodeURIComponent("Hi PDCA, I'd like to find out more about your lab.")}`,
    );
    await expect(page.locator('a[data-loc="contact_card"][href^="tel:"]')).toHaveAttribute("href", "tel:+6568423371");
    await expect(page.locator('a[data-loc="contact_card"][href^="mailto:"]')).toHaveAttribute(
      "href",
      "mailto:admin@pdcadental.com",
    );
    await expect(page.locator("#visit")).toBeVisible();

    const float = page.locator('a[data-loc="float"]');
    await expect(float).toHaveAttribute("data-wa", "general");
    await page.goto("/patients");
    await expect(float).toHaveAttribute("data-wa", "patient");
    await page.goto("/dentists");
    await expect(float).toHaveAttribute("data-wa", "dentistCase");
  });

  test("map loads only after Show map", async ({ page }) => {
    await dismissConsent(page);
    const mapRequests: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("google.com/maps")) mapRequests.push(r.url());
    });
    await page.route("https://www.google.com/maps**", (r) => r.fulfill({ status: 200, body: "map" }));
    await page.goto("/contact");
    await page.waitForTimeout(300);
    expect(mapRequests).toHaveLength(0);
    await page.getByRole("button", { name: "Show map" }).click();
    await expect(page.locator('iframe[title*="Map"]')).toBeAttached();
  });

  test("enquiry form validates, submits JSON and shows success", async ({ page }) => {
    await dismissConsent(page);
    let body: Record<string, unknown> | null = null;
    await page.route(ENQUIRY_URL, async (route) => {
      body = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"code":200}' });
    });
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
    expect(body).toBeNull();

    await page.getByRole("textbox", { name: "Name" }).fill("Dr Tan");
    await page.getByRole("textbox", { name: "Email" }).fill("tan@example.com");
    await page.getByRole("textbox", { name: "Message" }).fill("Hello");
    await page.getByLabel(/I agree to PDCA/).check();
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("Thanks. We aim to reply the same working day.")).toBeVisible();
    expect(body).toMatchObject({ name: "Dr Tan", email: "tan@example.com", message: "Hello", consent: true, website: "" });
    expect(page.url()).not.toContain("tan@example.com");
  });
});
