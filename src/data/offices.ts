import type { VisitorRegion } from "@/lib/visitorRegion";

export type Office = {
  id: "india" | "usa";
  branchLabel: string;
  address: string;
  shortAddress: string;
  phoneDisplay: string;
  phoneTel: string;
  mapEmbed: string;
  mapTitle: string;
};

export const INDIA_OFFICE: Office = {
  id: "india",
  branchLabel: "India · Headquarters",
  address: "Panacea IT Services Pvt. Ltd., Madhapur, Hyderabad, Telangana, India",
  shortAddress: "Madhapur, Hyderabad, India",
  phoneDisplay: "+91 93479 59536",
  phoneTel: "+919347959536",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272226612346!2d78.38157547516346!3d17.42008808347494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f5ada2ad11%3A0x89047701198f1f5!2sPanacea%20IT%20Services%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  mapTitle: "Panacea IT Services Headquarters, Hyderabad",
};

export const USA_OFFICE: Office = {
  id: "usa",
  branchLabel: "United States · Manchester",
  address: "Manchester, New Hampshire 03102, USA",
  shortAddress: "Manchester, New Hampshire 03102",
  phoneDisplay: "+1 603 660 7704",
  phoneTel: "+16036607704",
  mapEmbed:
    "https://maps.google.com/maps?q=Manchester%2C%20New%20Hampshire%2003102%2C%20USA&z=12&output=embed",
  mapTitle: "Panacea IT Services, Manchester, New Hampshire",
};

/** US visitors see the Manchester desk only. India and every other region see both branches. */
export function officesForRegion(region: VisitorRegion): Office[] {
  if (region === "US") return [USA_OFFICE];
  return [INDIA_OFFICE, USA_OFFICE];
}
