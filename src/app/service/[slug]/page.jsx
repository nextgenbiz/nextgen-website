import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, FileText, ListChecks, MessageCircleQuestion, Route } from "@/components/ui/icons";
import PageHero from "@/components/ui/PageHero";
import PageToc from "@/components/ui/PageToc";
import Accordion from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Section";
import ApplyButton from "@/components/forms/ApplyButton";
import CtaBand from "@/components/home/CtaBand";
import JsonLd, { breadcrumbLd, faqLd } from "@/components/seo/JsonLd";
import { SERVICES, CATEGORIES, getService, resolveSimilar } from "@/data/services";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = getService(slug);
  if (!b) return { title: "Service not found | NextGen Business Consultancy" };
  const url = `${SITE.url}/service/${slug}`;
  const image = `${SITE.url}/brand/og-image.png`;
  const description = b.content?.introduction ? b.content.introduction.slice(0, 200).replace(/\s+\S*$/, "") + "…" : b.description;
  return {
    title: `${b.title} | NextGen Business Consultancy`,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: b.bigtitlle, description: b.description, url, siteName: SITE.name, locale: "en_IN", type: "article", images: [{ url: image, width: 1200, height: 630, alt: b.title }] },
    twitter: { card: "summary_large_image", title: b.bigtitlle, description: b.description, images: [image], creator: SITE.twitter },
  };
}

/** "Label: detail" → bold label + detail. Falls back to plain text. */
function splitBenefit(text) {
  const i = text.indexOf(":");
  if (i > 0 && i < 60) return { label: text.slice(0, i).trim(), body: text.slice(i + 1).trim() };
  return { label: null, body: text };
}

function Block({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0 md:pt-12">
      <h2 className="h3 mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const b = getService(slug);
  if (!b) notFound();

  const c = b.content || {};
  const meta = SERVICES.find((s) => s.slug === slug);
  const category = CATEGORIES.find((x) => x.value === meta?.category);
  const url = `${SITE.url}/service/${slug}`;
  const similar = (b.sidesimilarites || []).map(resolveSimilar).filter((s) => s && s.slug !== slug);
  const docs = c.documentsRequiredDetailed || b.documentsRequired;

  // TOC mirrors exactly what is rendered below, so every link has a target.
  const toc = [
    { id: "introduction", label: "Introduction" },
    c.keybenefits?.length && { id: "key-benefits", label: "Key Benefits" },
    c.eligibilityRequirements?.length && { id: "eligibility", label: "Eligibility Requirements" },
    docs?.length && { id: "documents", label: "Documents Required" },
    c.registrationProcess?.length && { id: "process", label: "Registration Process" },
    c.faq?.length && { id: "faq", label: "Frequently Asked Questions" },
  ].filter(Boolean);

  // "At a glance" cards only report what the page really contains (counts come from the data).
  const glance = [
    docs?.length && { href: "#documents", icon: FileText, value: docs.length, label: docs.length === 1 ? "document required" : "documents required" },
    c.eligibilityRequirements?.length && { href: "#eligibility", icon: ListChecks, value: c.eligibilityRequirements.length, label: "eligibility points" },
    c.registrationProcess?.length && { href: "#process", icon: Route, value: c.registrationProcess.length, label: "steps in the process" },
    c.faq?.length && { href: "#faq", icon: MessageCircleQuestion, value: c.faq.length, label: "questions answered" },
  ].filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE.url}/` },
          { name: "Services", url: `${SITE.url}/solution` },
          { name: b.title, url },
        ])}
      />
      {c.faq?.length > 0 && <JsonLd data={faqLd(c.faq)} />}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: b.title,
          description: b.description,
          url,
          provider: { "@type": "ProfessionalService", "@id": `${SITE.url}/#professionalservice` },
          areaServed: { "@type": "Country", name: "India" },
        }}
      />

      <PageHero
        eyebrow={category?.label}
        title={b.bigtitlle}
        lead={b.description}
        crumbs={[{ label: "Solutions", href: "/solution" }, { label: b.title }]}
        image="/illustrations/hero/solutions.webp"
        sticker="Expert-led, end to end"
        imageAlt={b.title}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ApplyButton service={b.title} className="btn btn-primary btn-lg">
            Get started with {b.title.replace(/\s*\(.*\)/, "")} <ArrowRight className="h-4 w-4" />
          </ApplyButton>
        </div>
      </PageHero>

      {glance.length > 0 && (
        <Container className="relative z-10 mt-8 md:mt-10">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {glance.map((g) => {
              const Icon = g.icon;
              return (
                <li key={g.href}>
                  <a href={g.href} className="group flex h-full items-center gap-3.5 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-impact md:p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-impact-50 text-impact transition-colors group-hover:bg-impact group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-2xl leading-none text-champion">{g.value}</span>
                      <span className="mt-1 block text-[13px] leading-tight text-mute">{g.label}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      )}

      <section className="section !pt-12 md:!pt-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* mobile: horizontal chips */}
          <div className="lg:hidden">
            <PageToc items={toc} orientation="horizontal" />
          </div>

          {/* sidebar */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 space-y-8">
              <div>
                <p className="eyebrow mb-3">On this page</p>
                <PageToc items={toc} />
              </div>

              {similar.length > 0 && (
                <div>
                  <p className="eyebrow mb-3">Similar services</p>
                  <ul className="divide-y divide-line border-y border-line">
                    {similar.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/service/${s.slug}`} className="group flex items-center justify-between gap-3 py-3 text-[15px] font-medium text-champion hover:text-impact">
                          {s.title}
                          <ArrowRight className="h-4 w-4 text-mute transition group-hover:translate-x-0.5 group-hover:text-impact" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="on-dark rounded-2xl bg-champion p-6">
                <h2 className="text-h4 font-semibold text-white">Ready to get started?</h2>
                <p className="mt-2 text-[15px] text-white/70">Talk to an expert about {b.title}. No obligations.</p>
                <ApplyButton service={b.title} className="btn btn-light mt-5 w-full">
                  Book a free consultation
                </ApplyButton>
              </div>
            </div>
          </aside>

          {/* content */}
          <article className="space-y-10 md:space-y-12 lg:col-span-8">
            <Block id="introduction" title="Introduction">
              {c.introduction && <p className="lead !text-champion">{c.introduction}</p>}
              {b.details && <p className="mt-4 text-base text-champion/80">{b.details}</p>}
            </Block>

            {c.keybenefits?.length > 0 && (
              <Block id="key-benefits" title="Key Benefits">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {c.keybenefits.map((point, i) => {
                    const { label, body } = splitBenefit(point);
                    return (
                      <li key={i} data-icon-trigger className="rounded-2xl border border-line bg-white p-5">
                        <span className="mb-3 grid h-7 w-7 place-items-center rounded-full bg-impact-50 text-impact">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                        {label && <p className="font-semibold text-champion">{label}</p>}
                        <p className={label ? "mt-1 text-[15px] text-champion/75" : "text-[15px] text-champion/80"}>{body}</p>
                      </li>
                    );
                  })}
                </ul>
              </Block>
            )}

            {c.eligibilityRequirements?.length > 0 && (
              <Block id="eligibility" title="Eligibility Requirements">
                <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
                  {c.eligibilityRequirements.map((point, i) => (
                    <li key={i} className="flex items-start gap-3.5 px-5 py-4">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-impact" />
                      <span className="text-base text-champion/85">{point}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {docs?.length > 0 && (
              <Block id="documents" title="Documents Required">
                <ol className="grid gap-3 sm:grid-cols-2">
                  {docs.map((d, i) => (
                    <li key={i} className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-champion text-sm font-bold text-white">{i + 1}</span>
                      <span className="text-[15px] font-medium text-champion">{d}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {c.registrationProcess?.length > 0 && (
              <Block id="process" title="Registration Process">
                <ol className="relative ml-4 space-y-8 border-l-2 border-impact/25 pl-10">
                  {c.registrationProcess.map((step, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[3.4rem] grid h-9 w-9 place-items-center rounded-full bg-impact text-sm font-bold text-white ring-4 ring-white">{i + 1}</span>
                      <p className="pt-1 text-base font-medium text-champion">{step}</p>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {c.faq?.length > 0 && (
              <Block id="faq" title="Frequently Asked Questions">
                <Accordion items={c.faq} />
              </Block>
            )}

            {/* in-flow CTA (the sticky card is hidden on small screens) */}
            <div className="on-dark rounded-3xl bg-impact p-8 md:p-10 lg:hidden">
              <h3 className="h3">Ready to get started?</h3>
              <p className="mt-2 text-white/85">Talk to an expert about {b.title}. No obligations.</p>
              <ApplyButton service={b.title} className="btn btn-light mt-6 w-full sm:w-auto">
                Book a free consultation
              </ApplyButton>
            </div>

            {similar.length > 0 && (
              <div className="lg:hidden">
                <p className="eyebrow mb-3">Similar services</p>
                <ul className="divide-y divide-line border-y border-line">
                  {similar.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/service/${s.slug}`} className="flex items-center justify-between py-3.5 font-medium text-champion">
                        {s.title} <ArrowRight className="h-4 w-4 text-mute" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </Container>
      </section>

      <CtaBand context={`${b.title} (service page)`} />
    </>
  );
}
