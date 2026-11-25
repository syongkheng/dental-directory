import { expect, test } from "@playwright/test";

test.describe("/insights", () => {
  test("is noindex, unlinked, and its pre-rendered HTML holds no numbers", async ({ request }) => {
    const html = await (await request.get("/insights")).text();
    expect(html).toContain('<meta name="robots" content="noindex,nofollow"/>');
    expect(html).not.toContain("kpi-visitors");
    const home = await (await request.get("/")).text();
    expect(home).not.toContain("/insights");
  });

  test("shows four KPI tiles and the chart, with no cookie banner or site chrome", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.locator('[data-testid^="kpi-"]')).toHaveCount(4);
    await expect(page.getByTestId("visitors-chart").locator("rect").first()).toBeAttached();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    await expect(page.locator('a[data-loc="float"]')).toHaveCount(0);
    await expect(page.getByText("Sample data: random numbers")).toBeVisible();
  });

  test("changing the month updates the URL and the numbers", async ({ page }) => {
    await page.goto("/insights");
    const visitors = page.getByTestId("kpi-visitors");
    await expect(visitors).toBeVisible();
    const before = await visitors.textContent();
    const select = page.getByLabel("Month");
    const values = await select.locator("option").evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
    const target = values.filter((v) => v !== "mtd")[3];
    await select.selectOption(target);
    await expect(page).toHaveURL(new RegExp(`period=${target}`));
    await expect(visitors).not.toHaveText(before ?? "");
  });

  test("Download PDF calls window.print", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __printed: number }).__printed = 0;
      window.print = () => {
        (window as unknown as { __printed: number }).__printed++;
      };
    });
    await page.goto("/insights");
    await page.getByRole("button", { name: "Download PDF" }).click();
    expect(await page.evaluate(() => (window as unknown as { __printed: number }).__printed)).toBe(1);
  });
});
