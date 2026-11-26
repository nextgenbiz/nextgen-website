import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { CATEGORIES, servicesByCategory } from "@/data/services";

export default function ServicesOverview() {
  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Solutions"
            title="Everything your business needs, under one roof."
            lead="Your one-stop hub for Startup India, MSME support, tax exemptions, and investor connections."
          />
          <Link href="/solution" className="btn btn-outline shrink-0 self-start md:self-auto">
            View all solutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const items = servicesByCategory(cat.value);
            return (
              <Reveal key={cat.value} delay={i * 0.08} className="card flex flex-col p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="h4">{cat.label}</h3>
                  <span className="text-sm font-bold text-impact">{String(items.length).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 text-[15px] text-mute">{cat.blurb}</p>
                <ul className="mt-6 divide-y divide-line border-t border-line">
                  {items.slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        className="group flex items-center justify-between gap-3 py-3.5 text-[15px] font-medium text-champion transition-colors hover:text-impact"
                      >
                        {s.title}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-impact" />
                      </Link>
                    </li>
                  ))}
                </ul>
                {items.length > 5 && (
                  <Link href={`/solution?category=${cat.value}`} className="mt-auto pt-6 text-sm font-semibold text-impact hover:underline">
                    + {items.length - 5} more
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
