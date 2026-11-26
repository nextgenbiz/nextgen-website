import Script from "next/script";
import { Clock, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import LeadForm from "@/components/forms/LeadForm";
import CtaBand from "@/components/home/CtaBand";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { MotifMark } from "@/components/ui/Motif";
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

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something
            <br />
            <span className="text-heaven">great together.</span>
          </>
        }
        lead="Partner with industry experts who deliver innovative solutions tailored to your unique business needs."
        crumbs={[{ label: "Contact" }]}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <MotifMark className="mb-5 h-5" />
            <h2 className="h2">Talk to our team.</h2>
            <p className="lead mt-4">
              Tell us a little about your business. We reply quickly and always with a clear next step.
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-impact-50 text-impact"><Phone className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm text-mute">Call us</p>
                  <a href={SITE.phoneHref} className="text-lg font-semibold text-champion hover:text-impact">{SITE.phone}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-impact-50 text-impact"><Mail className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm text-mute">Email</p>
                  <a href={`mailto:${SITE.email}`} className="text-lg font-semibold text-champion [overflow-wrap:anywhere] hover:text-impact">{SITE.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-impact-50 text-impact"><Clock className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm text-mute">Working hours</p>
                  <p className="text-lg font-semibold text-champion">{SITE.hours}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-10">
              <h2 className="h3 mb-1">Send us a message</h2>
              <p className="mb-8 text-sm text-mute">All fields are required unless marked optional.</p>
              <LeadForm showService messageRequired submitLabel="Send message" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" id="offices">
        <Container>
          <p className="eyebrow mb-3">Find our locations</p>
          <h2 className="h2 max-w-2xl">We operate across multiple major cities.</h2>
          <p className="lead mt-4 max-w-2xl">Committed to providing localized service and support.</p>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {OFFICES.map((o) => (
              <li key={o.title} className="card flex flex-col p-7">
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
