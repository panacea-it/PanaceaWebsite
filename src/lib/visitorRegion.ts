export type VisitorRegion = "US" | "OTHER";
export type VisitorRegionHint = VisitorRegion | "UNKNOWN";

/** IANA zones used in the United States, including legacy aliases browsers still return. */
const US_TIME_ZONES = new Set([
  "America/Adak",
  "America/Anchorage",
  "America/Boise",
  "America/Chicago",
  "America/Denver",
  "America/Detroit",
  "America/Indiana/Indianapolis",
  "America/Indiana/Knox",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Tell_City",
  "America/Indiana/Vevay",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indianapolis",
  "America/Juneau",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Los_Angeles",
  "America/Louisville",
  "America/Menominee",
  "America/Metlakatla",
  "America/New_York",
  "America/Nome",
  "America/North_Dakota/Beulah",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/Phoenix",
  "America/Sitka",
  "America/Yakutat",
  "Pacific/Honolulu",
]);

type HeaderReader = { get(name: string): string | null };

export function regionFromCountry(country: string | null | undefined): VisitorRegionHint {
  const code = (country || "").trim().toUpperCase();
  if (!code || code === "XX" || code === "T1") return "UNKNOWN";
  return code === "US" ? "US" : "OTHER";
}

export function regionFromTimeZone(timeZone: string | undefined): VisitorRegion {
  if (timeZone && US_TIME_ZONES.has(timeZone)) return "US";
  return "OTHER";
}

export function countryHintFromHeaders(headerList: HeaderReader): VisitorRegionHint {
  const country =
    headerList.get("x-vercel-ip-country") ||
    headerList.get("cf-ipcountry") ||
    headerList.get("cloudfront-viewer-country") ||
    headerList.get("x-country-code");
  return regionFromCountry(country);
}
