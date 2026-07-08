import { test, expect } from "@playwright/test";

/**
 * Footer and CTA Section E2E Test (FEAT-007)
 *
 * Verifies that the footer, CTA section, and utility pages render
 * with correct Sovereign Shield visual language.
 *
 * Prerequisite: visual-language-baseline must pass first.
 *
 * @VisualLanguage @FEAT-007
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("Footer and CTA Section (FEAT-007)", () => {
  test("Final CTA section renders with Sovereign Shield styling", async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // CTA section heading
    await expect(
      page.getByText("Bring protocol-bound voting to your organization."),
    ).toBeVisible();

    // Two CTA buttons
    const pilotBtn = page.getByText("Request pilot access");
    const downloadBtn = page.getByText("Download overview");
    await expect(pilotBtn).toBeVisible();
    await expect(downloadBtn).toBeVisible();

    // CTA card uses surface fill, not white borders
    const ctaSection = await page.$("main > section:last-of-type");
    if (ctaSection) {
      const whiteBorders = await ctaSection.$$eval(
        '[class*="border-white"]',
        (els) => els.length,
      );
      expect(whiteBorders).toBe(0);
    }
  });

  test("Footer renders with brand, tagline, and legal links", async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Footer exists
    const footer = await page.$("footer");
    expect(footer).not.toBeNull();

    // Brand text
    await expect(page.locator("footer").getByText("HushVoting!")).toBeVisible();

    // Tagline mentions HushNetwork
    await expect(
      page.locator("footer").getByText(/product of HushNetwork/i),
    ).toBeVisible();

    // Legal links
    await expect(
      page.locator("footer").getByText("Privacy Policy"),
    ).toBeVisible();
    await expect(
      page.locator("footer").getByText("Terms of Service"),
    ).toBeVisible();
    await expect(
      page.locator("footer").getByText("Security Audit"),
    ).toBeVisible();

    // Footer uses surface-container-lowest background
    const footerBg = await page.$eval(
      "footer",
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(footerBg).toBe("rgb(5, 14, 29)");
  });

  test("Utility page uses Sovereign Shield styling", async ({ page }) => {
    await page.goto(`${BASE_URL}/privacy`);
    await page.waitForTimeout(1000);

    // Page uses Sovereign Shield surface colors
    const bodyBg = await page.$eval(
      "body",
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(bodyBg).toBe("rgb(9, 20, 34)");

    // Has a link back to homepage
    const homeLink = page.getByRole("link", { name: /home/i });
    await expect(homeLink).toBeVisible();
  });

  test("Utility pages expose placeholder content without implying final approval", async ({
    page,
  }) => {
    // /terms page
    await page.goto(`${BASE_URL}/terms`);
    await page.waitForTimeout(1000);

    await expect(
      page.getByText("Launch placeholder — final review pending."),
    ).toBeVisible();
    await expect(
      page.getByText("Term of Service").or(page.getByText("Terms of Service")),
    ).toBeVisible();
    const termsHomeLink = page.getByRole("link", { name: /home/i });
    await expect(termsHomeLink).toBeVisible();

    // /security page
    await page.goto(`${BASE_URL}/security`);
    await page.waitForTimeout(1000);

    await expect(
      page.getByText("Launch placeholder — final review pending."),
    ).toBeVisible();
    await expect(page.getByText("Security Audit")).toBeVisible();
    const securityHomeLink = page.getByRole("link", { name: /home/i });
    await expect(securityHomeLink).toBeVisible();
  });
});
