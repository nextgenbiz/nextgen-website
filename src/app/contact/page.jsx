import Link from "next/link";
import { PopPair } from "@/components/illustrations/PeepScene";
import Script from "next/script";
import { ChevronRight, Clock, Mail, MapPin, Phone, ArrowUpRight } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/Section";
import ContactFormCard from "@/components/forms/ContactFormCard";
import CtaBand from "@/components/home/CtaBand";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { OFFICES, SITE } from "@/lib/site";

const ogTitle = "Get in Touch | Expert Business Support at NextGen Consultancy";
const ogDescription =
  "Reach out to NextGen Business Consultancy for registration, compliance, funding, and growth support for your startup or MSME.";
const image = `${SITE.url}/brand/og-image.png`;

export const metadata = {
  title: "Reach Out to NextGen Consultancy | Business Growth Partner",
  description:
    "Contact NextGen Business Consultancy today – from compliance to growth strategies, we handle everything so you focus on your business",
  alternates: { canonical: `${SITE.url}/contact` },
  robots: { index: true, follow: true },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: `${SITE.url}/contact`,
    siteName: "NextGen Business Consultancy",
    locale: "en_IN",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, alt: "NextGen Consultancy - Contact Us" }],
  },
  twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [image], creator: SITE.twitter },
};

function ContactDetails() {
  const rows = [
    { icon: Phone, label: "Call us", node: <a href={SITE.phoneHref} className="hover:text-impact">{SITE.phone}</a> },
    { icon: Mail, label: "Email", node: <a href={`mailto:${SITE.email}`} className="[overflow-wrap:anywhere] hover:text-impact">{SITE.email}</a> },
    { icon: Clock, label: "Working hours", node: <span>{SITE.hours}</span> },
  ];
  return (
    <ul className="space-y-5">
      {rows.map(({ icon: Icon, label, node }) => (
        <li key={label} data-icon-trigger className="flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-impact-50 text-impact">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm text-mute">{label}</p>
            <p className="text-lg font-semibold text-champion">{node}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ContactPage() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE.url}/` },
          { name: "Contact", url: `${SITE.url}/contact` },
        ])}
      />
      {recaptchaSiteKey && (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" />
      )}

      {/*
        The form lives in the hero on purpose: on a 768px-tall laptop the old layout pushed it
        below the fold. Order on phones: headline -> form -> details + art.
        On desktop: headline + illustration on the left, form on the right, brand circles bleeding
        behind the card (Swiss-poster style asymmetry).
      */}
      <section className="relative isolate overflow-hidden border-b-[3px] border-champion bg-white">
        {/* same faint blueprint grid as the other heroes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(#101D32_1px,transparent_1px),linear-gradient(90deg,#101D32_1px,transparent_1px)] [background-size:44px_44px]"
        />
        <Container className="relative grid gap-x-14 gap-y-8 pb-12 pt-24 md:pt-32 lg:grid-cols-12 lg:pb-16">
          {/* 1. headline (+ art on desktop) */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-1.5 text-[13px] text-mute">
                <li><Link href="/" className="hover:text-impact">Home</Link></li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight animated={false} className="h-3.5 w-3.5" />
                  <span className="text-champion" aria-current="page">Contact</span>
                </li>
              </ol>
            </nav>
            <p className="mb-4 inline-block -rotate-1 border-[3px] border-champion bg-heaven px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[3px_3px_0_0_#101D32]">
              Contact
            </p>
            <h1 className="h1 !text-[2.15rem] !leading-[1.1] md:!text-[3rem]">
              Let&apos;s build something <span className="my-1 inline-block bg-impact px-2.5 pb-0.5 text-white">great together.</span>
            </h1>
            <p className="lead mt-4 max-w-md">
              Partner with industry experts who deliver innovative solutions tailored to your unique business needs.
            </p>
          </div>

          {/* 2. the form: right column on desktop, right after the headline on phones */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <ContactFormCard />
          </div>

          {/* 3. contact details, and the two people on desktop */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-end">
            <ContactDetails />
            <PopPair peeps={[102, 28]} className="mt-10 hidden lg:block" />
          </div>
        </Container>
      </section>

      <Section tone="surface" id="offices">
        <Container>
          <p className="eyebrow mb-3">Find our locations</p>
          <h2 className="h2 max-w-2xl">We operate across multiple major cities.</h2>
          <p className="lead mt-4 max-w-2xl">Committed to providing localized service and support.</p>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {OFFICES.map((o) => (
              <li key={o.title} data-icon-trigger className="card flex flex-col p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-impact text-white"><MapPin className="h-5 w-5" /></span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-impact">{o.city}</p>
                <h3 className="mt-1 text-h4 font-semibold">{o.title}</h3>
                <address className="mt-3 flex-1 text-[15px] not-italic leading-relaxed text-champion/80">{o.address}</address>
                <a href={o.map} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-impact hover:underline">
                  Open in Maps <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand context="Contact page" />
    </>
  );
}
