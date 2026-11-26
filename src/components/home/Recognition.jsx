import Image from "next/image";
import { Award } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { AWARD } from "@/data/content";

export default function Recognition() {
  return (
    <Section>
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-impact-50 text-impact">
            <Award className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="eyebrow mb-3">Recognition</p>
          <h2 className="h2">{AWARD.title}</h2>
          <p className="lead mt-4">{AWARD.caption}</p>
          <p className="mt-6 border-l-2 border-impact pl-4 text-sm font-semibold text-champion">{AWARD.by}</p>
        </div>

        <div className="grid grid-cols-6 gap-3 lg:col-span-7 lg:gap-4">
          <Reveal className="relative col-span-6 aspect-[16/10] overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/assets/awards/stage-1.webp"
              alt="The Nextgen team receiving the Most Trusted Advisory Business of the Year award on stage"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.06} className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/assets/awards/stage-2.webp"
              alt="Nextgen leadership with the Outlook Business Spotlight award"
              fill
              sizes="(min-width: 1024px) 28vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.12} className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/assets/awards/banner.webp"
              alt="Outlook Business Most Trusted Business Advisory of the Year 2026 announcement"
              fill
              sizes="(min-width: 1024px) 28vw, 50vw"
              className="object-cover object-top"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
