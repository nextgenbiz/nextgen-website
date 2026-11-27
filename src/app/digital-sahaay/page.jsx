import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  FileText,
  Globe2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Rocket,
  Search,
  TrendingUp,
} from "@/components/ui/icons";
import PageHero from "@/components/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { PopPeep } from "@/components/illustrations/PeepScene";
import { Burst, Highlight, Pin, Tiles } from "@/components/ui/Decor";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { DS_CONTACT, DS_SERVICES, DS_STEPS, DS_URL, dsLink } from "@/data/digital";
import { SITE } from "@/lib/site";

const title = "Digital Sahaay | Our Digital Growth Arm | NextGen Business Consultancy";
const description =
  "Digital Sahaay is the digital growth company of the NextGen group: websites, SEO, social media, performance marketing, branding and lead generation for startups, MSMEs and established brands.";
const image = `${SITE.url}/brand/og-image.png`;

export const metadata = {
  title,
  description,
  alternates: { canonical: `${SITE.url}/digital-sahaay` },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: `${SITE.url}/digital-sahaay`,
    siteName: "NextGen Business Consultancy",
    locale: "en_IN",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, alt: "Digital Sahaay by NextGen" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

const ICONS = { Globe2, Search, MessageSquareText, TrendingUp, BadgeCheck, FileText, Rocket, BriefcaseBusiness };

/** Every link out to digitalsahaay.com opens in a new tab. */
const ext = { target: "_blank", rel: "noopener noreferrer" };

export default function DigitalSahaayPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE.url}/` },
          { name: "Digital Sahaay", url: `${SITE.url}/digital-sahaay` },
        ])}
      />

      <PageHero
        eyebrow="Our digital arm"
        title={
          <>
            Digital Sahaay,
            <br />
            your digital <span className="text-impact">growth partner.</span>
          </>
        }
        lead="Websites, SEO, social media and performance marketing for startups, MSMEs and established brands, built around real results."
        crumbs={[{ label: "Digital Sahaay" }]}
        image="/illustrations/hero/digital-sahaay.webp"
        sticker="Part of the NextGen group"
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={dsLink("/")} {...ext} className="btn btn-primary btn-lg">
            Visit digitalsahaay.com <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={dsLink("/contact")} {...ext} className="btn btn-outline btn-lg">
            Free consultation
          </a>
        </div>
      </PageHero>

      {/* how it fits with Nextgen */}
      <Section>
        <Container className="max-w-4xl text-center">
          <SectionHeading
            align="center"
            eyebrow="One group, one growth path"
            title={<>Nextgen sets your business up. Digital Sahaay <Highlight>takes it online.</Highlight></>}
            lead="Registrations, compliance and funding are the foundation. Once that is in place, Digital Sahaay builds the visibility on top: a website that converts, search and social that bring people in, and campaigns that turn attention into enquiries."
          />
        </Container>
      </Section>

      {/* services */}
      <Section tone="surface" id="services" className="relative overflow-hidden !bg-impact-50">
        <Tiles className="absolute -left-3 top-0 hidden h-20 w-20 md:grid" />
        <Burst className="absolute -right-4 top-2 hidden h-24 w-24 md:block" />
        <Container className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What they do"
              title="Everything you need to grow, in one place."
              lead="Pick a service to see it on digitalsahaay.com."
            />
            <a href={dsLink("/services")} {...ext} className="btn btn-outline shrink-0 self-start md:self-auto">
              All services <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DS_SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.title} as="li" delay={(i % 4) * 0.05}>
                  <a
                    href={s.href}
                    {...ext}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-impact/40 hover:shadow-lift"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-impact-50 text-impact">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="h4 mt-5">{s.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] text-champion/75">{s.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-impact">
                      Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      <span className="sr-only"> about {s.title} (opens digitalsahaay.com in a new tab)</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* process: tilted pinned cards */}
      <Section className="relative overflow-hidden">
        <Container>
          <SectionHeading eyebrow="How it works" title="A simple three-step growth process." />
          <div className="relative mt-16">
            <span aria-hidden="true" className="absolute inset-x-[10%] top-1/2 hidden border-t-2 border-dashed border-impact/25 md:block" />
            <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
              {DS_STEPS.map((s, i) => (
                <Reveal key={s.title} as="li" delay={i * 0.07}>
                  <div className={"relative mx-auto max-w-sm rounded-3xl border border-line bg-white p-6 pt-8 shadow-card transition-transform duration-300 hover:rotate-0 md:p-7 md:pt-9 " + ["md:-rotate-2", "md:rotate-1", "md:-rotate-1"][i]}>
                    <Pin className="-top-2.5 left-1/2 -translate-x-1/2" />
                    <PopPeep id={s.peep} className="mx-auto mt-10 w-32 sm:w-40" />
                    <h3 className="h4 mt-4">{s.title}</h3>
                    <p className="mt-2 text-[15px] text-champion/75">{s.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* contact / redirect */}
      <Section tone="brand" className="!py-14 md:!py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3 !text-white">Take the next step</p>
            <h2 className="h2">Ready to take your business to the next level?</h2>
            <p className="lead mt-4 max-w-xl">
              Book a free strategy call with Digital Sahaay and find out what is possible for your business.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={dsLink("/contact")} {...ext} className="btn btn-light btn-lg">
                Book a free call <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={dsLink("/")} {...ext} className="btn btn-outline-light btn-lg">
                Visit digitalsahaay.com
              </a>
            </div>
          </div>

          <ul className="space-y-4 text-white lg:col-span-5">
            <li>
              <a href={DS_CONTACT.phoneHref} className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 transition hover:bg-white/15">
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{DS_CONTACT.phone}</span>
                  <span className="block text-sm text-white/90">{DS_CONTACT.hours}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={DS_CONTACT.whatsapp} {...ext} className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 transition hover:bg-white/15">
                <MessageSquareText className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="font-semibold">Chat on WhatsApp</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${DS_CONTACT.email}`} className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 transition hover:bg-white/15">
                <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="font-semibold [overflow-wrap:anywhere]">{DS_CONTACT.email}</span>
              </a>
            </li>
            <li data-icon-trigger className="flex items-center gap-4 px-5 text-sm text-white/90">
              <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
              {DS_CONTACT.offices}
            </li>
          </ul>
        </Container>
      </Section>

      <p className="bg-white px-5 py-6 text-center text-xs text-mute">
        Digital Sahaay is part of the NextGen group of companies and is operated at{" "}
        <a href={DS_URL} {...ext} className="underline hover:text-impact">digitalsahaay.com</a>. Need business setup or funding help instead?{" "}
        <Link href="/contact" className="underline hover:text-impact">Talk to Nextgen</Link>.
      </p>
    </>
  );
}
