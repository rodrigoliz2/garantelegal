import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

const TEST_SITE_KEY = "1x00000000000000000000AA";
const TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export function turnstileSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;
}

export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY || TEST_SECRET_KEY;
  if (!secret || !token) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      cache: "no-store"
    });
    const result = await response.json() as { success?: boolean };
    return response.ok && result.success === true;
  } catch {
    return false;
  }
}

export async function checkRateLimit(ip: string, action: string, limit = 5): Promise<boolean> {
  const windowStart = new Date(Math.floor(Date.now() / 3_600_000) * 3_600_000);
  const key = createHash("sha256").update(`${process.env.NEXTAUTH_SECRET || "local"}:${action}:${ip}:${windowStart.toISOString()}`).digest("hex");
  const bucket = await prisma.rateLimitBucket.upsert({ where: { key }, create: { key, windowStart, count: 1 }, update: { count: { increment: 1 } } });
  return bucket.count <= limit;
}

export function requestIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
