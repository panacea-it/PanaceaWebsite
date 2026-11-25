import {
  countryHintFromHeaders,
  regionFromCountry,
  type VisitorRegionHint,
} from "@/lib/visitorRegion";

type HeaderReader = { get(name: string): string | null };

const cache = new Map<string, { region: VisitorRegionHint; expires: number }>();
const DAY_MS = 24 * 60 * 60 * 1000;

function isPublicIp(ip: string) {
  const value = ip.toLowerCase().replace(/^::ffff:/, "");
  if (
    value === "::1" ||
    value.startsWith("127.") ||
    value.startsWith("10.") ||
    value.startsWith("192.168.") ||
    value.startsWith("169.254.") ||
    value.startsWith("fc") ||
    value.startsWith("fd") ||
    value.startsWith("fe80:")
  ) {
    return false;
  }
  const privateBlock = value.match(/^172\.(\d+)\./);
  if (privateBlock) {
    const octet = Number(privateBlock[1]);
    if (octet >= 16 && octet <= 31) return false;
  }
  return true;
}

function clientIp(headerList: HeaderReader) {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0];
  const candidates = [headerList.get("cf-connecting-ip"), headerList.get("x-real-ip"), forwarded];
  for (const candidate of candidates) {
    const ip = candidate?.trim().replace(/^::ffff:/, "");
    if (ip && isPublicIp(ip)) return ip;
  }
  return null;
}

async function lookupCountry(ip: string | null): Promise<VisitorRegionHint> {
  const key = ip || "self";
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.region;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
  try {
    const url = ip ? `https://ipwho.is/${encodeURIComponent(ip)}` : "https://ipwho.is/";
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return "UNKNOWN";
    const data = (await response.json()) as { success?: boolean; country_code?: string };
    if (data.success === false) return "UNKNOWN";
    const region = regionFromCountry(data.country_code);
    if (region !== "UNKNOWN") cache.set(key, { region, expires: Date.now() + DAY_MS });
    return region;
  } catch {
    return "UNKNOWN";
  } finally {
    clearTimeout(timer);
  }
}

/** Country from the connection itself. Never uses the browser location permission. */
export async function resolveVisitorRegion(headerList: HeaderReader): Promise<VisitorRegionHint> {
  const fromNetwork = countryHintFromHeaders(headerList);
  if (fromNetwork !== "UNKNOWN") return fromNetwork;

  const ip = clientIp(headerList);
  if (ip) return lookupCountry(ip);

  // Localhost has no visitor IP. This machine's own connection is the visitor.
  if (process.env.NODE_ENV === "development") return lookupCountry(null);
  return "UNKNOWN";
}
