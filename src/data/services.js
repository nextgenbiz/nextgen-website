import {
  Building2,
  Users,
  UserRound,
  Handshake,
  Receipt,
  ClipboardCheck,
  Rocket,
  BadgeCheck,
  Globe2,
  Anchor,
  Sprout,
  Wheat,
  Landmark,
  Factory,
  ShieldCheck,
  Banknote,
  HandCoins,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";
import { businessTypes } from "./businessData";

export { businessTypes };

export const CATEGORIES = [
  {
    value: "registration",
    label: "Business Registration",
    blurb: "Pick the right structure and get incorporated, properly.",
  },
  {
    value: "compliance",
    label: "Certificates & Compliances",
    blurb: "GST, Startup India, Udyam and the filings that keep you legal.",
  },
  {
    value: "funding",
    label: "Funding Support",
    blurb: "Loans, grants and seed capital matched to your business.",
  },
];

const META = {
  "private-limited-company": { category: "registration", icon: Building2 },
  "limited-liability-partnership": { category: "registration", icon: Users },
  "one-person-company": { category: "registration", icon: UserRound },
  "registered-partnership": { category: "registration", icon: Handshake },
  "gst-certificate": { category: "compliance", icon: Receipt },
  "company-compliances": { category: "compliance", icon: ClipboardCheck },
  "startup-india-certificate": { category: "compliance", icon: Rocket },
  "udyam-certificate-msme": { category: "compliance", icon: BadgeCheck },
  "import-export-code": { category: "compliance", icon: Globe2 },
  "icegate-registration": { category: "compliance", icon: Anchor },
  "startup-india-seedfund": { category: "funding", icon: Sprout },
  "rkvy-raftaar": { category: "funding", icon: Wheat },
  naiff: { category: "funding", icon: Landmark },
  pmegp: { category: "funding", icon: Factory },
  cgtmse: { category: "funding", icon: ShieldCheck },
  "mudra-loan": { category: "funding", icon: Banknote },
  "startup-seed-support": { category: "funding", icon: HandCoins },
  "project-finance": { category: "funding", icon: BriefcaseBusiness },
  "venture-capital-funds": { category: "funding", icon: TrendingUp },
};

export const SERVICES = businessTypes.map((b) => ({
  slug: b.slug,
  title: b.title,
  description: b.description,
  category: META[b.slug]?.category ?? "compliance",
  icon: META[b.slug]?.icon ?? BadgeCheck,
}));

export function getService(slug) {
  return businessTypes.find((b) => b.slug === slug);
}

// The old data refers to "similar services" by display name, and a few names don't
// match any service title exactly. These aliases resolve them to the right page.
const ALIASES = {
  "one person company": "one-person-company",
  "opc one person company": "one-person-company",
  "partnership firm": "registered-partnership",
};

export function resolveSimilar(name = "") {
  const key = name.trim().toLowerCase();
  const slug =
    ALIASES[key] ||
    businessTypes.find((b) => b.title.toLowerCase() === key)?.slug ||
    businessTypes.find((b) => b.title.toLowerCase().startsWith(key))?.slug;
  if (!slug) return null;
  const b = getService(slug);
  return { slug, title: b.title };
}

export function servicesByCategory(value) {
  return SERVICES.filter((s) => s.category === value);
}
