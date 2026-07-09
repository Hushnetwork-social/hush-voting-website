import { test, expect } from "@playwright/test";

/**
 * Scaffold Happy-Path E2E Test
 *
 * Verifies that the HushVoting website scaffold is reachable and renders
 * the expected brand content with Sovereign Shield styling.
 *
 * This is the foundation for future Gherkin-driven acceptance tests.
 * Future FEATs should add scenarios to the Gherkin feature files and
 * wire them to step definitions when the integration harness expands.
 *
 * @HappyPath @Smoke
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("Scaffold Happy Path", () => {
  test("The scaffold homepage is reachable and renders brand content", async ({
    page,
  }) => {
    await page.goto(BASE_URL);

    // Verify the page renders with the expected brand name
    await expect(
      page.getByRole("link", { name: "HushVoting home" }),
    ).toBeVisible();

    // Verify the tagline is rendered
    await expect(
      page.getByRole("heading", {
        name: "Governed remote voting for serious organizations",
      }),
    ).toBeVisible();

    // Verify the page title
    await expect(page).toHaveTitle(/HushVoting/);
  });
});
