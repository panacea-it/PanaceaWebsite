"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  regionFromTimeZone,
  type VisitorRegion,
  type VisitorRegionHint,
} from "@/lib/visitorRegion";

const VisitorRegionContext = createContext<VisitorRegion>("OTHER");

export function VisitorRegionProvider({
  initialRegion,
  children,
}: {
  initialRegion: VisitorRegionHint;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [region, setRegion] = useState<VisitorRegion>(initialRegion === "US" ? "US" : "OTHER");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("region")?.toUpperCase();
    if (query === "US") {
      setRegion("US");
      return;
    }
    if (query === "IN") {
      setRegion("OTHER");
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 4000);
    // Uses the connection address. A VPN changes this. It does not ask for location,
    // and the computer clock is ignored because a VPN does not change the time zone.
    fetch("https://api.country.is/", { signal: controller.signal, cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("country lookup failed");
        return response.json() as Promise<{ country?: string }>;
      })
      .then((data) => {
        const code = (data.country || "").trim().toUpperCase();
        if (!code) throw new Error("missing country");
        setRegion(code === "US" ? "US" : "OTHER");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (initialRegion === "US") setRegion("US");
        else if (initialRegion === "OTHER") setRegion("OTHER");
        else setRegion(regionFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone));
      })
      .finally(() => window.clearTimeout(timer));

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [initialRegion, pathname]);

  return <VisitorRegionContext.Provider value={region}>{children}</VisitorRegionContext.Provider>;
}

export function useVisitorRegion() {
  return useContext(VisitorRegionContext);
}
