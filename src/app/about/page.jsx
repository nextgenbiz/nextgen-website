import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import EventCards from "@/components/about/EventCards";
import CtaBand from "@/components/home/CtaBand";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { TIMELINE, VALUES, PROCESS, IMPACT } from "@/data/content";
import { SITE } from "@/lib/site";

const ogTitle = "Discover NextGen Business Consultancy | From Idea to Growth";
const ogDescription =
  "From registration to business expansion, NextGen Business Consultancy enables founders to focus on growth while we handle the rest.";
const image = `${SITE.url}/brand/og-image.png`;

export const metadata = {
  title: "NextGen Consultancy India | Trusted Startup Growth Partner",
  description:
    "Learn how NextGen Consultancy supports entrepreneurs with Startup India certification, MSME compliance, and strategic business growth.",
  alternates: { canonical: `${SITE.url}/about` },
  robots: { index: true, follow: true },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: `${SITE.url}/about`,
    siteName: "NextGen Business Consultancy",
    locale: "en_IN",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, alt: "NextGen Consultancy - About Us" }],
  },
  twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [image] },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE.url}/` },
          { name: "About", url: `${SITE.url}/about` },
        ])}
      />

      <PageHero
        eyebrow="Our story"
        title={
          <>
            Transforming business dreams
            <br />
            <span className="text-heaven">into reality.</span>
          </>
        }
        lead="Revolutionizing consultancy with breakthrough AI technology. We transform visionary ideas into tangible success stories that reshape industries."
        crumbs={[{ label: "Our Story" }]}
        size="lg"
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn btn-light btn-lg">
            Begin journey <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/solution" className="btn btn-outline-light btn-lg">View services</Link>
        </div>
      </PageHero>

      {/* team */}
      <section className="bg-white pt-16 md:pt-24">
        <Container>
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-surface md:aspect-[21/9]">
            <Image
              src="/assets/activites/1.webp"
              alt="The Nextgen team together"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-[50%_40%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-champion/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-lg font-bold text-white md:bottom-8 md:left-8 md:text-2xl">
              A team that treats your business like its own.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* journey */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Journey"
            title="Next-gen Business Consultancy's journey to leadership."
            lead="Every milestone tells a story of innovation, growth, and dedication."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} as="li" delay={i * 0.06} className="bg-white p-7 md:p-9">
                <p className="text-stat">{t.year}</p>
                <span aria-hidden="true" className="my-5 block h-1 w-10 rounded-full bg-heaven" />
                <h3 className="h4">{t.title}</h3>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* values */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Values" title="From spark to motion: the Next-Gen way." />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} as="li" delay={i * 0.08} className="card p-7 md:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-impact font-display text-lg text-white">{i + 1}</span>
                <h3 className="h3 mt-8">{v.title}</h3>
                <p className="mt-3 text-base text-champion/80">{v.description}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* process */}
      <Section tone="dark">
        <Container>
          <SectionHeading eyebrow="Our process" title="Next-Gen Business Consultancy growth." />
          <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-5">
            {PROCESS.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 0.07} className="relative">
                <div className="flex items-center gap-3 md:mb-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-impact font-display text-base text-white ring-4 ring-champion">{i + 1}</span>
                  {i < PROCESS.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-white/20 md:block" />}
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-white md:mt-0">{s.title}</h3>
                <p className="mt-2 text-[15px] text-white/70">{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* impact */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Impact" title="Beyond business, toward legacy." />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {IMPACT.map((p, i) => (
              <Reveal key={p.title} as="li" delay={(i % 2) * 0.08} className="flex gap-5 rounded-2xl border border-line p-6 md:p-8">
                <span className="text-stat !text-heaven shrink-0">0{i + 1}</span>
                <div>
                  <h3 className="h4">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-champion/80">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* culture */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Life at Nextgen" title="Celebrations, events and team moments." />
            <Link href="/about/events" className="btn btn-outline shrink-0 self-start md:self-auto">
              All events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <EventCards />
          </div>
        </Container>
      </Section>

      <CtaBand context="About page" />
    </>
  );
}
