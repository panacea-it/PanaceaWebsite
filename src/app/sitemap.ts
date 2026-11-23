import type { MetadataRoute } from "next";
import { marketingServices } from "@/data/digitalMarketing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.panaceaitservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/products",
    "/portfolio",
    "/careers",
    "/contact",
    "/resources",
    "/blog",
    "/faq",
    "/about",
    "/vision",
    "/privacy",
    "/terms",
    "/services/digital-marketing",
    ...marketingServices.map((service) => `/services/${service.slug}`),
  ];

  return staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contact" || path === "/services" ? 0.9 : 0.7,
  }));
}
