import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import ServiceTabs from "@/components/home/ServiceTabs";
import { CATEGORIES, servicesByCategory } from "@/data/services";

const CATEGORY_IMAGES = {
  registration: {
    src: "/images/service-registration.webp",
    alt: "Business incorporation portfolio and modern office desk",
  },
  compliance: {
    src: "/images/service-compliance.webp",
    alt: "Compliance advisor reviewing verified business certificates",
  },
  funding: {
    src: "/images/service-funding.webp",
    alt: "Startup founder and investor shaking hands in a boardroom",
  },
};

const SHOWN = 5;

export default function ServicesOverview() {
  const data = CATEGORIES.map((cat) => {
    const items = servicesByCategory(cat.value);
    return {
      value: cat.value,
      label: cat.label,
      blurb: cat.blurb,
      count: items.length,
      cover: CATEGORY_IMAGES[cat.value],
      items: items.slice(0, SHOWN).map((s) => ({ slug: s.slug, title: s.title })),
      more: Math.max(0, items.length - SHOWN),
    };
  });

  return (
    <Section id="services" className="!py-10 md:!py-16">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Solutions"
            title="Everything your business needs, under one roof."
            lead="Your one-stop hub for Startup India, MSME support, tax exemptions, and investor connections."
            leadClassName="hidden sm:block"
          />
          <Link href="/solution" className="btn btn-outline hidden shrink-0 self-start md:inline-flex md:self-auto">
            View all solutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ServiceTabs data={data} />
      </Container>
    </Section>
  );
}
