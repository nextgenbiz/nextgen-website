import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { PRINCIPLES } from "@/data/content";

/** "Empowering Business Success": why founders work with Nextgen. */
export default function Principles() {
  return (
    <Section tone="surface">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-3">Why Nextgen</p>
            <h2 className="h2">Empowering business success.</h2>
            <p className="lead mt-4">
              We don&apos;t just advise; we co-create, building businesses like co-founders, not outside consultants.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <Image
                src="/images/hero-solutions.webp"
                alt="Founder and NextGen strategist co-creating a business growth roadmap"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} as="li" delay={i * 0.05} className="group grid grid-cols-[3.5rem_1fr] items-start gap-4 border-t border-champion/15 py-8 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr] md:py-10">
              <span className="text-stat !text-impact/90 transition-colors group-hover:!text-impact">0{i + 1}</span>
              <div>
                <h3 className="h3">{p.title}</h3>
                <p className="mt-2 max-w-xl text-base text-champion/80">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
