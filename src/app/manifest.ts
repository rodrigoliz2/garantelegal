import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return { name: siteConfig.name, short_name: "Garante", description: siteConfig.tagline, start_url: "/", display: "standalone", background_color: "#FFFFFF", theme_color: "#0A0A0A", lang: "es-MX", icons: [{ src: "/brand/pwa-192.png", sizes: "192x192", type: "image/png" }, { src: "/brand/pwa-512.png", sizes: "512x512", type: "image/png" }] };
}
