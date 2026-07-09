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

test.describe("@VisualLanguage @FEAT-007 Footer and CTA Section (FEAT-007)", () => {
  test("Final CTA section renders with Sovereign Shield styling", async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    const cta = page.locator("#pilot-access");

    // CTA section heading
    await expect(
      cta.getByRole("heading", {
        name: "Bring protocol-bound voting to your organization.",
      }),
    ).toBeVisible();

    // CTA actions
    const pilotAccessButton = cta.getByRole("button", {
      name: "Request pilot access",
    });
    await expect(pilotAccessButton).toBeVisible();
    await expect(
      cta.getByRole("link", { name: "Download overview" }),
    ).toHaveCount(0);

    const dialog = page.getByRole("dialog");
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await pilotAccessButton.click();
      if ((await dialog.count()) > 0) {
        break;
      }
      await page.waitForTimeout(500);
    }
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("textbox", { name: "Email address" }),
    ).toBeVisible();
    await expect(dialog.getByRole("textbox", { name: "Message" })).toHaveValue(
      "I want to have pilot access to HushVoting!",
    );
    await expect(
      dialog.getByRole("textbox", { name: "Message" }),
    ).toHaveAttribute("maxlength", "256");

    // Layout regression checks: the intro copy must read as normal prose,
    // not as one-word-per-line text, and the overlay must own the viewport
    // above the fixed header.
    const introBox = await page
      .getByTestId("pilot-access-overlay-intro")
      .boundingBox();
    if (!introBox) {
      throw new Error("Pilot access intro copy was not measurable");
    }
    expect(introBox.width).toBeGreaterThanOrEqual(360);
    expect(introBox.height).toBeLessThanOrEqual(80);

    const dialogBox = await dialog.boundingBox();
    const viewport = page.viewportSize();
    if (!dialogBox || !viewport) {
      throw new Error("Pilot access dialog was not measurable");
    }
    expect(dialogBox.y).toBeGreaterThanOrEqual(16);
    expect(dialogBox.height).toBeLessThanOrEqual(viewport.height - 32);

    const overlayOwnsTopLeft = await page.evaluate(() => {
      return (
        document
          .elementFromPoint(20, 20)
          ?.closest('[data-testid="pilot-access-overlay-backdrop"]') !== null
      );
    });
    expect(overlayOwnsTopLeft).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

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

    const footerLocator = page.locator("footer");

    // Brand text
    await expect(footerLocator.getByText("HushVoting!", { exact: true })).toBeVisible();

    // Tagline mentions HushNetwork
    await expect(
      footerLocator.getByText(/product of HushNetwork/i),
    ).toBeVisible();

    // Legal links
    await expect(
      footerLocator.getByText("Privacy Policy"),
    ).toBeVisible();
    await expect(
      footerLocator.getByText("Terms of Service"),
    ).toBeVisible();
    await expect(
      footerLocator.getByText("Security Audit"),
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
      page.getByText("Draft terms — legal review pending."),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Terms of Service" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pilot access" })).toBeVisible();
    const termsHomeLink = page.getByRole("link", { name: /home/i });
    await expect(termsHomeLink).toBeVisible();

    // /security page
    await page.goto(`${BASE_URL}/security`);
    await page.waitForTimeout(1000);

    await expect(
      page.getByText("Security status — independent audit evidence pending."),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Security Audit" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Validated implementation baseline" }),
    ).toBeVisible();
    const securityHomeLink = page.getByRole("link", { name: /home/i });
    await expect(securityHomeLink).toBeVisible();
  });
});
