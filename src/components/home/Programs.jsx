import { ArrowRight, Info } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ApplyButton from "@/components/forms/ApplyButton";
import { PROGRAMS } from "@/data/content";

/** Premium funding ecosystem. Shared by the home and solutions pages. */
export default function Programs() {
  return (
    <Section tone="dark" id="funding">
      <Container>
        <SectionHeading
          eyebrow="Funding ecosystem"
          title="Premium funding, within reach."
          lead="Access India's most prestigious funding programs with streamlined approval processes and dedicated expert support."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} as="li" delay={(i % 3) * 0.06} className="group flex flex-col bg-champion p-7 transition-colors hover:bg-champion-800 md:p-9">
              <p className="text-stat !text-heaven">{p.amount}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">funding</p>
              <h3 className="mt-6 text-h4 font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-[15px] text-white/70">{p.description}</p>
              <ApplyButton
                service={p.title}
                className="mt-8 inline-flex items-center gap-2 self-start text-[15px] font-semibold text-white transition-colors hover:text-heaven"
              >
                Apply now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ApplyButton>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-impact p-7 md:flex-row md:items-center md:p-9">
          <div>
            <h3 className="text-h3 font-bold text-white">Need funding help?</h3>
            <p className="mt-1.5 text-white/80">Get expert guidance on your funding journey, no obligations.</p>
          </div>
          <ApplyButton service="General Funding Inquiry" className="btn btn-light btn-lg shrink-0">
            Explore solutions <ArrowRight className="h-4 w-4" />
          </ApplyButton>
        </div>

        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-white/50">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Amounts shown are indicative. Eligibility, terms and approval are decided by the sanctioning bank or authority.
          Nextgen is an independent consultancy and is not affiliated with any government body.
        </p>
      </Container>
    </Section>
  );
}
