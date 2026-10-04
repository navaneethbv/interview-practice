import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  forbidOnly: !!process.env.CI,
  use: { baseURL: "http://127.0.0.1:4326", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: process.env.CI ? "npm run start -- --hostname 127.0.0.1 --port 4326" : "npm run dev -- --hostname 127.0.0.1 --port 4326",
    url: "http://127.0.0.1:4326",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
