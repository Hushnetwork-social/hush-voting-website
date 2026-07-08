import { test, expect } from "@playwright/test";

/**
 * Protocol Evidence and Platform Readiness E2E Test (FEAT-006)
 *
 * Verifies that the Protocol Evidence and Platform Readiness sections
 * render with correct Sovereign Shield visual language.
 *
 * Prerequisite: visual-language-baseline must pass first.
 *
 * @VisualLanguage @FEAT-006
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("Protocol Evidence Section (FEAT-006)", () => {
  test("Protocol Evidence section renders with Sovereign Shield styling", async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Section exists
    const protocol = await page.$("#protocol");
    expect(protocol).not.toBeNull();

    // Heading is visible
    await expect(page.getByText("Protocol Omega")).toBeVisible();

    // 6 evidence items in a grid
    const evidenceItems = await page.$$('#protocol [class*="inset-well"]');
    expect(evidenceItems.length).toBeGreaterThanOrEqual(6);

    // No white borders in the section
    const whiteBorders = await page.$$eval(
      '#protocol [class*="border-white"]',
      (els) => els.length,
    );
    expect(whiteBorders).toBe(0);

    // Section uses surface-container-low background band
    const sectionBg = await page.$eval(
      "#protocol",
      (el) => getComputedStyle(el).background,
    );
    expect(sectionBg).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("Platform Readiness section renders 3 deployment cards", async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Section exists
    const platform = await page.$("#platform");
    expect(platform).not.toBeNull();

    // Heading
    await expect(
      page.getByText("Universal Deployment Readiness"),
    ).toBeVisible();

    // 3 cards
    const cards = await page.$$('#platform [class*="bg-surface-container"]');
    expect(cards.length).toBeGreaterThanOrEqual(3);

    // No white borders
    const whiteBorders = await page.$$eval(
      '#platform [class*="border-white"]',
      (els) => els.length,
    );
    expect(whiteBorders).toBe(0);
  });

  test("Claim boundary bar renders with badges", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Look for claim badges — should show key product claims
    const claims = [
      "Designed for organizational remote voting",
      "Privacy-first",
      "Verifiable outcomes",
    ];
    for (const claim of claims) {
      await expect(page.getByText(claim)).toBeVisible();
    }
  });
});
