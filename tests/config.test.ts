import { describe, expect, it } from "vitest";
import { siteConfig, whatsappHref } from "../src/site.config";

describe("site configuration", () => {
  it("keeps contact actions in one place", () => {
    expect(siteConfig.whatsappBase).toBe("https://wa.me/526182829873");
    expect(siteConfig).not.toHaveProperty("phoneHref");
    expect(whatsappHref("hola mundo")).toContain("text=hola%20mundo");
  });
});
