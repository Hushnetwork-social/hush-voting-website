import { describe, it, expect } from "vitest";

/**
 * Scaffold Unit Test
 *
 * Verifies that the foundation configuration is present and valid.
 * This test runs without a browser and validates static properties
 * of the scaffold configuration.
 */

describe("Scaffold Configuration", () => {
  it("package.json exists with required scripts", async () => {
    const pkg = await import("../../package.json");
    expect(pkg).toBeDefined();
    expect(pkg.scripts).toBeDefined();
    expect(pkg.scripts.dev).toBeDefined();
    expect(pkg.scripts.build).toBeDefined();
    expect(pkg.scripts.start).toBeDefined();
    expect(pkg.scripts["test:unit"]).toBeDefined();
    expect(pkg.scripts["test:e2e:happy-path"]).toBeDefined();
    expect(pkg.packageManager).toMatch(/^pnpm/);
  });

  it("TypeScript strict mode is enabled", async () => {
    const tsconfig = await import("../../tsconfig.json");
    expect(tsconfig).toBeDefined();
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });

  it("Tailwind CSS is configured", async () => {
    const pkg = await import("../../package.json");
    const hasTailwind =
      "tailwindcss" in (pkg.devDependencies ?? {});
    const hasTailwindVite =
      "@tailwindcss/vite" in (pkg.devDependencies ?? {});
    expect(hasTailwind || hasTailwindVite).toBe(true);
  });
});
