import { defineConfig } from "vitest/config";
import path from "node:path";
import { config } from "dotenv";

config();

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: { include: ["tests/**/*.test.ts"] }
});
