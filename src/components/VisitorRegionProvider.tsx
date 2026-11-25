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
    if (initialRegion === "US") {
      setRegion("US");
      return;
    }
    if (initialRegion === "OTHER") {
      setRegion("OTHER");
      return;
    }

    // Silent fallback when the connection country cannot be read. This does not prompt.
    setRegion(regionFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone));
  }, [initialRegion, pathname]);

  return <VisitorRegionContext.Provider value={region}>{children}</VisitorRegionContext.Provider>;
}

export function useVisitorRegion() {
  return useContext(VisitorRegionContext);
}
