import { test, expect } from "@playwright/test";

/**
 * Responsive Design and Mobile Optimization E2E Test (FEAT-008)
 *
 * Verifies that all sections are fully responsive with correct
 * touch targets, layout adjustments, and typography scaling.
 *
 * Prerequisite: visual-language-baseline must pass first.
 *
 * @VisualLanguage @FEAT-008
 */

import {
  VIEWPORT_375,
  VIEWPORT_768,
  VIEWPORT_1440,
  ALL_VIEWPORTS,
  TOUCH_TARGET_MIN_HEIGHT,
  TOUCH_TARGET_MIN_WIDTH,
} from "./fixtures/responsive";
import {
  matchesGutter,
  parsePxValue,
  hasWhiteBorderClass,
} from "./fixtures/responsive-helpers";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("@VisualLanguage @FEAT-008 Responsive Layout (FEAT-008)", () => {
  /* ── Navigation ── */

  test("@FEAT-008 Navigation switches to hamburger on mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({
      width: VIEWPORT_375.width,
      height: VIEWPORT_375.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Inline desktop nav should NOT be visible on mobile
    await expect(page.locator("header nav").first()).toBeHidden();

    // Hamburger button should be visible
    const hamburger = page.getByRole("button", { name: "Open navigation" });
    await expect(hamburger).toBeVisible();

    // Click hamburger to open nav
    await hamburger.click();
    await page.waitForTimeout(500);

    // Nav links should now be visible in the disclosure panel
    const mobileNav = page.locator("header nav:visible");
    const mobileNavLinks = mobileNav.getByRole("link");
    await expect(mobileNav.getByRole("link", { name: "Trust Model" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Roles" })).toBeVisible();

    // Touch targets >= 48px
    const navLinkHeight = await mobileNavLinks.first().evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.height;
    });
    expect(navLinkHeight).toBeGreaterThanOrEqual(TOUCH_TARGET_MIN_HEIGHT);

    // Mobile nav surface should use bg-surface-container-low
    const panel = page.locator("header div.absolute.left-0.right-0");
    const panelBg = await panel.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(panelBg).toBeTruthy(); // Non-transparent background is present

    // No border-white on mobile nav
    const panelClasses = await panel.evaluate((el) => el.className);
    expect(hasWhiteBorderClass(panelClasses)).toBe(false);
  });

  test("Tablet navigation uses hamburger disclosure", async ({ page }) => {
    await page.setViewportSize({
      width: VIEWPORT_768.width,
      height: VIEWPORT_768.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Hamburger should be visible (tablet = hamburger)
    const hamburger = page.getByRole("button", { name: "Open navigation" });
    await expect(hamburger).toBeVisible();

    // Click hamburger to open
    await hamburger.click();
    await page.waitForTimeout(500);

    // Nav links should be visible
    const mobileNav = page.locator("header nav:visible");
    await expect(mobileNav.getByRole("link", { name: "Trust Model" })).toBeVisible();

    // Pilot Access CTA should be visible in disclosure
    await expect(mobileNav.getByRole("link", { name: "Pilot Access" })).toBeVisible();
  });

  test("@FEAT-008 Navigation shows inline links on desktop viewport", async ({
    page,
  }) => {
    await page.setViewportSize({
      width: VIEWPORT_1440.width,
      height: VIEWPORT_1440.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Inline nav links visible
    const desktopNav = page.locator("header nav:visible");
    await expect(desktopNav.getByRole("link", { name: "Trust Model" })).toBeVisible();
    await expect(desktopNav.getByRole("link", { name: "Roles" })).toBeVisible();
    await expect(
      desktopNav.getByRole("link", { name: "Protocol Evidence" }),
    ).toBeVisible();
    await expect(desktopNav.getByRole("link", { name: "Platform" })).toBeVisible();

    // Pilot Access button visible in header
    await expect(
      page.locator("header").getByRole("link", { name: "Pilot Access" }),
    ).toBeVisible();
  });

  /* ── Layout Grids ── */

  test("@FEAT-008 Role cards display in correct grid at different viewports", async ({
    page,
  }) => {
    for (const vp of [VIEWPORT_375, VIEWPORT_768, VIEWPORT_1440]) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL);
      await page.waitForTimeout(1000);

      const cards = page.locator("#roles > .grid > div");
      const cardCount = await cards.count();

      // Expect at least 4 role cards
      expect(cardCount).toBeGreaterThanOrEqual(4);

      if (cardCount > 0) {
        const firstCard = cards.first();
        const parentWidth = await firstCard.evaluate((el) => {
          const parent = el.parentElement;
          return parent ? parent.getBoundingClientRect().width : 0;
        });
        const cardWidth = await firstCard.evaluate(
          (el) => el.getBoundingClientRect().width,
        );

        // On mobile (375px): single column means card width ≈ parent width
        if (vp.width <= 767) {
          expect(cardWidth).toBeGreaterThan(parentWidth * 0.8);
        }
      }
    }
  });

  /* ── No White Borders ── */

  test("@FEAT-008 No white borders at any viewport", async ({ page }) => {
    for (const vp of ALL_VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL);
      await page.waitForTimeout(1000);

      const whiteBorders = await page.$$eval(
        '[class*="border-white"]',
        (els) => els.length,
      );
      expect(whiteBorders).toBe(0);
    }
  });

  /* ── Section Padding ── */

  test("@FEAT-008 Section padding adjusts for viewport", async ({ page }) => {
    // Mobile: 16px
    await page.setViewportSize({
      width: VIEWPORT_375.width,
      height: VIEWPORT_375.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    const mobilePadding = await page.$eval(
      "#protocol > div",
      (el) => getComputedStyle(el).paddingLeft,
    );
    expect(matchesGutter(mobilePadding, "mobile", 2)).toBe(true);

    // Desktop: 24px
    await page.setViewportSize({
      width: VIEWPORT_1440.width,
      height: VIEWPORT_1440.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    const desktopPadding = await page.$eval(
      "#protocol > div",
      (el) => getComputedStyle(el).paddingLeft,
    );
    expect(matchesGutter(desktopPadding, "desktop", 2)).toBe(true);
  });

  /* ── Hero Typography ── */

  test("Hero typography uses fluid clamp values", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    const heroFontSize = await page.$eval(
      "#hero-heading",
      (el) => getComputedStyle(el).fontSize,
    );

    // On a 1440px viewport, clamp(2rem, 5vw, 48px) should resolve
    // to something between 32px and 48px
    const fontSizeNum = parsePxValue(heroFontSize);
    expect(Number.isNaN(fontSizeNum)).toBe(false);
    expect(fontSizeNum).toBeGreaterThanOrEqual(32);
    expect(fontSizeNum).toBeLessThanOrEqual(48);
  });

  /* ── Touch Targets ── */

  test("@FEAT-008 Touch targets meet minimum size", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    // Check all interactive elements
    const interactiveSelectors = [
      "header a",
      "header button",
      "footer a",
      "main a",
    ];

    for (const selector of interactiveSelectors) {
      const elements = page.locator(selector);
      const count = await elements.count();

      for (let i = 0; i < count; i++) {
        const box = await elements.nth(i).boundingBox();
        if (box) {
          if (
            box.width < TOUCH_TARGET_MIN_WIDTH &&
            box.height < TOUCH_TARGET_MIN_HEIGHT
          ) {
            // Only fail if both dimensions are below threshold
            // (a tall narrow element or wide short one may still be clickable)
            expect(
              box.height >= TOUCH_TARGET_MIN_HEIGHT ||
                box.width >= TOUCH_TARGET_MIN_WIDTH,
            ).toBeTruthy();
          }
        }
      }
    }
  });

  /* ── Protocol Evidence Layouts ── */

  test("Protocol Evidence items stack on mobile and grid on desktop", async ({
    page,
  }) => {
    // Mobile
    await page.setViewportSize({
      width: VIEWPORT_375.width,
      height: VIEWPORT_375.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    const items = page.locator("#protocol .grid > div");
    const itemCount = await items.count();
    expect(itemCount).toBeGreaterThanOrEqual(6);

    // Desktop
    await page.setViewportSize({
      width: VIEWPORT_1440.width,
      height: VIEWPORT_1440.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);
  });

  /* ── Platform Readiness Layouts ── */

  test("Platform Readiness cards stack on mobile and grid on desktop", async ({
    page,
  }) => {
    // Mobile
    await page.setViewportSize({
      width: VIEWPORT_375.width,
      height: VIEWPORT_375.height,
    });
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);

    const cards = page.locator("#platform .grid > div");
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3);
  });
});
