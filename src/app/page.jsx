import Script from "next/script";
import HomeHero from "@/components/home/HomeHero";
import Ticker from "@/components/home/Ticker";
import ServicesOverview from "@/components/home/ServicesOverview";
import Programs from "@/components/home/Programs";
import Principles from "@/components/home/Principles";
import Stats from "@/components/home/Stats";
import Recognition from "@/components/home/Recognition";
import Reviews from "@/components/home/Reviews";
import Shorts from "@/components/home/Shorts";
import FaqSection from "@/components/home/FaqSection";
import CtaBand from "@/components/home/CtaBand";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { HOME_FAQ } from "@/data/content";
import { SITE } from "@/lib/site";

const title = "NextGen Business Consultancy | India's Startup Growth Hub";
const ogTitle = "India's Trusted Partner for Startup Success | NextGen Consultancy";
const ogDescription =
  "Get expert guidance on registrations, tax holidays, compliance & investor linkage with NextGen Consultancy.";
const image = `${SITE.url}/brand/og-image.png`;

export const metadata = {
  title,
  description:
    "Your one-stop hub for Startup India, MSME support, tax exemptions, and investor connections. NextGen powers India's startup growth journey.",
  alternates: { canonical: `${SITE.url}/` },
  robots: { index: true, follow: true },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: `${SITE.url}/`,
    siteName: "NextGen Business Consultancy",
    locale: "en_IN",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, alt: "Nextgen Group of Companies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [image],
    creator: SITE.twitter,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", url: `${SITE.url}/` }])} />
      <Script
        src="https://cdn-in.pagesense.io/js/60064193730/f07b99df18894563bd538993af937091.js"
        strategy="afterInteractive"
      />
      <HomeHero />
      <Ticker />
      <ServicesOverview />
      <Programs />
      <Principles />
      <Stats />
      <Recognition />
      <Reviews />
      <Shorts />
      <FaqSection items={HOME_FAQ} tone="surface" lead="Straight answers about how we work with founders." />
      <CtaBand />
    </>
  );
}
