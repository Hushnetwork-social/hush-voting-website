import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "**/*.spec.ts",
  outputDir: "../../playwright-report",
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  // Do not run webServer by default — caller starts the server externally
  // webServer: {
  //   command: "pnpm start",
  //   port: 3000,
  //   timeout: 30000,
  //   reuseExistingServer: true,
  // },
});
