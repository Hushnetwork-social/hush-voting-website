import { test, expect } from "@playwright/test";

/**
 * Visual Language Baseline E2E Test
 *
 * Verifies that the Sovereign Shield CSS is actually loaded by the browser.
 * This is a prerequisite for ALL sections — without the CSS loading,
 * every Tailwind class and CSS custom property is inert.
 *
 * Current behaviour (before fix): FAILS ❌
 *   - No <link rel="stylesheet"> in <head>
 *   - --color-surface is undefined on :root
 *   - body renders with transparent background
 *   - fonts fall back to Times New Roman
 *
 * Expected behaviour (after root-layout fix): PASSES ✅
 *   - <link> tag exists in <head>
 *   - CSS custom properties resolve on :root
 *   - body has dark surface background
 *   - fonts load Hanken Grotesk
 *
 * @VisualLanguage @Prerequisite
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("@VisualLanguage @Prerequisite Visual Language Baseline", () => {
  test("@Prerequisite Sovereign Shield CSS is loaded by the browser", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(2000);

    // 1. Verify the browser has registered at least one stylesheet.
    // TanStack/Vite dev can keep CSS as a <link> or transform it during hydration,
    // so the gate checks the browser stylesheet registry instead of only <link> nodes.
    const stylesheetCount = await page.evaluate(() => document.styleSheets.length);
    expect(stylesheetCount).toBeGreaterThanOrEqual(1);

    // 2. Verify CSS custom property --color-surface resolves on :root
    const colorSurface = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-surface")
        .trim();
    });
    expect(colorSurface).toBe("#091422");

    // 3. Verify --font-family-hanken resolves
    const fontHanken = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--font-family-hanken")
        .trim();
    });
    expect(fontHanken).toContain("Hanken Grotesk");

    // 4. Verify body background-color is the Sovereign Shield surface color
    const bodyBg = await page.$eval(
      "body",
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(bodyBg).toBe("rgb(9, 20, 34)");

    // 5. Verify body font-family includes Hanken Grotesk
    const bodyFont = await page.$eval(
      "body",
      (el) => getComputedStyle(el).fontFamily,
    );
    expect(bodyFont).toContain("Hanken Grotesk");
  });
});
