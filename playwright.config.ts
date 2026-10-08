import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

config();
const baseURL = process.env.BASE_URL || "http://localhost:3000";
const port = new URL(baseURL).port || "3000";

export default defineConfig({
  testDir: "./e2e",
  timeout: 45_000,
  expect: { timeout: 12_000 },
  use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [{ name: "chromium-mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } }],
  webServer: { command: `PORT=${port} NEXTAUTH_URL=${baseURL} npm run start`, url: baseURL, reuseExistingServer: true, timeout: 60_000 },
  reporter: [["list"]]
});
