import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  devIndicators: false,
  // Servicios que pasaron de Mercantil a Corporativo: las direcciones antiguas siguen funcionando.
  // Solo el dominio oficial se indexa; la dirección *.vercel.app y cualquier otra reciben noindex.
  async headers() {
    return [{ source: "/:path*", missing: [{ type: "host", value: "(www\\.)?garantejuridico\\.com" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  async redirects() {
    return ["constitucion-sociedades", "conflictos-socios"].map(slug => ({ source: `/servicios/mercantil/${slug}`, destination: `/servicios/corporativo/${slug}`, permanent: true }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    qualities: [60, 70, 75]
  }
};

export default nextConfig;
