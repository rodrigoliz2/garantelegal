import { describe, expect, it } from "vitest";
import { siteConfig, whatsappHref } from "../src/site.config";

describe("site configuration", () => {
  it("keeps contact actions in one place", () => {
    expect(siteConfig.phoneHref).toMatch(/^tel:\+52/);
    expect(whatsappHref("hola mundo")).toContain("text=hola%20mundo");
  });
});
