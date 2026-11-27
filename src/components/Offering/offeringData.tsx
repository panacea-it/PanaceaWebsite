import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Megaphone,
  PenTool,
  ShieldCheck,
  Server,
  Boxes,
} from "lucide-react";
import type { ComponentType } from "react";

export type OfferingIcon = ComponentType<{ size?: number; className?: string }>;

export type OfferingItem = {
  id: string;
  title: string;
  subtitle: string;
  Icon: OfferingIcon;
};

function AndroidIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 4 6.2 7.2" />
      <path d="m16 4 1.8 3.2" />
      <rect x="7" y="8" width="10" height="9.5" rx="2.2" />
      <path d="M5.5 11.5v4.2a1.2 1.2 0 0 0 2.4 0v-4.2" />
      <path d="M16.1 11.5v4.2a1.2 1.2 0 0 0 2.4 0v-4.2" />
      <path d="M10 17.5v2.8" />
      <path d="M14 17.5v2.8" />
    </svg>
  );
}

function AppleIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 6.2c.6-1.6 2-2.7 3.6-2.8" />
      <path d="M16.4 8.2c1.9 1.1 2.9 3.3 2.4 5.5-.6 2.6-2.7 4.3-4.4 4.3-1 0-1.5-.6-2.8-.6s-1.8.6-2.7.6c-1.7 0-3.6-1.8-4.3-4.4-.8-2.9.4-6 2.6-7.1 1.2-.6 2.6-.3 3.6.4.8.6 1.5.6 2.3.3 1-.4 2-.3 3.3 1" />
    </svg>
  );
}

const lucide = (Icon: LucideIcon): OfferingIcon => Icon;

export const offerings: OfferingItem[] = [
  {
    id: "website",
    title: "Website",
    subtitle: "Web Platforms",
    Icon: lucide(Globe),
  },
  {
    id: "android",
    title: "Android",
    subtitle: "Native & Kotlin",
    Icon: AndroidIcon,
  },
  {
    id: "ios",
    title: "iOS",
    subtitle: "Swift & Apple",
    Icon: AppleIcon,
  },
  {
    id: "marketing",
    title: "Marketing",
    subtitle: "Growth & SEO",
    Icon: lucide(Megaphone),
  },
  {
    id: "uiux",
    title: "UI/UX",
    subtitle: "Product Design",
    Icon: lucide(PenTool),
  },
  {
    id: "security",
    title: "Security",
    subtitle: "Zero-Trust Audit",
    Icon: lucide(ShieldCheck),
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Scalable APIs",
    Icon: lucide(Server),
  },
  {
    id: "devops",
    title: "Dev Ops",
    subtitle: "Cloud & CI/CD",
    Icon: lucide(Boxes),
  },
];
