import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import ServiceExplorer from "@/components/solution/ServiceExplorer";
import Programs from "@/components/home/Programs";
import FaqSection from "@/components/home/FaqSection";
import CtaBand from "@/components/home/CtaBand";
import ApplyButton from "@/components/forms/ApplyButton";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { SOLUTION_FAQ } from "@/data/content";
import { SITE } from "@/lib/site";

const ogTitle = "NextGen Services | From Compliance to Digital Marketing & Expansion";
const ogDescription =
  "NextGen Business Consultancy offers tailored services to empower startups & MSMEs with funding, compliance, and digital growth.";
const image = `${SITE.url}/brand/og-image.png`;

export const metadata = {
  title: "NextGen Services | Compliance, Funding & Growth for Startups & MSMEs",
  description:
    "From registrations to investor access – NextGen Business Consultancy services help businesses grow faster and stay compliant.",
  alternates: { canonical: `${SITE.url}/solution` },
  robots: { index: true, follow: true },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: `${SITE.url}/solution`,
    siteName: "NextGen Business Consultancy",
    locale: "en_IN",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, alt: "NextGen Consultancy - Services" }],
  },
  twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [image], creator: SITE.twitter },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE.url}/solution#service`,
  name: "Business Consultancy Services",
  description:
    "Comprehensive business consultancy services including Startup India Registration, MSME Registration, Tax Exemptions, Funding Support, and Compliance Management.",
  provider: { "@type": "ProfessionalService", "@id": `${SITE.url}/#professionalservice` },
  serviceType: ["Business Consulting", "Startup Registration", "MSME Registration", "Tax Consultation", "Funding Assistance"],
  areaServed: { "@type": "Country", name: "India" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Our Services",
    itemListElement: [
      "Startup India Registration",
      "MSME Registration",
      "Tax Exemption Services",
      "Investor Connection",
      "Business Compliance",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

export default function SolutionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE.url}/` },
          { name: "Services", url: `${SITE.url}/solution` },
        ])}
      />
      <JsonLd data={serviceLd} />

      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Funding solutions
            <br />
            <span className="text-heaven">for every business.</span>
          </>
        }
        lead="From startups to established enterprises, we provide comprehensive funding solutions across all business categories with expert guidance and support."
        crumbs={[{ label: "Solutions" }]}
        size="lg"
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn btn-light btn-lg">
            Get funding now <ArrowRight className="h-4 w-4" />
          </Link>
          <ApplyButton service="Expert Consultation" className="btn btn-outline-light btn-lg">
            Expert consultation
          </ApplyButton>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Explore"
            title="Find the right service."
            lead="Business registration, certificates and compliances, and funding support. Each one explained in plain language."
          />
          <div className="mt-10">
            <Suspense fallback={<div className="h-64" />}>
              <ServiceExplorer />
            </Suspense>
          </div>
        </Container>
      </Section>

      <Programs />
      <FaqSection items={SOLUTION_FAQ} tone="surface" lead="Clear answers to help you move forward with confidence." />
      <CtaBand />
    </>
  );
}
