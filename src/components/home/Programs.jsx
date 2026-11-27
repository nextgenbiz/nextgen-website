import { ArrowRight, Info } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ApplyButton from "@/components/forms/ApplyButton";
import { PROGRAMS } from "@/data/content";

/**
 * Premium funding ecosystem. Shared by the home and solutions pages.
 * A calm, scannable list: amount, program, and one tap target per row (opens the enquiry form for that program).
 * Two columns on desktop, one on phones, where the descriptions are hidden so the whole list fits one screen.
 */
export default function Programs() {
  return (
    <Section tone="dark" id="funding" className="!py-12 md:!py-16">
      <Container>
        <div className="grid gap-x-12 gap-y-3 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow mb-3">Funding ecosystem</p>
            <h2 className="h2">Premium funding, within reach.</h2>
          </div>
          <p className="lead hidden sm:block lg:max-w-lg lg:justify-self-end">
            Access India&apos;s most prestigious funding programs with streamlined approval processes and dedicated expert support.
          </p>
        </div>

        <ul className="mt-7 grid border-t border-white/10 md:mt-9 md:grid-cols-2 md:gap-x-12">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} as="li" delay={(i % 2) * 0.05} className="border-b border-white/10">
              <ApplyButton
                service={p.title}
                className="group flex w-full items-center gap-4 rounded-lg py-4 text-left transition-colors hover:bg-white/[0.04] sm:gap-6 sm:px-3 sm:py-5"
              >
                <span className="w-[5rem] shrink-0 font-display text-2xl leading-none text-heaven sm:w-32 sm:text-[2.1rem]">{p.amount}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold leading-snug text-white sm:text-lg">{p.title}</span>
                  <span className="mt-0.5 hidden text-sm text-white/65 sm:block">{p.description}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-heaven">
                  <span className="hidden sm:inline">Apply now</span>
                  <span className="sr-only sm:hidden">Apply now</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </ApplyButton>
            </Reveal>
          ))}
        </ul>

        <p data-icon-trigger className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-white/50">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Amounts shown are indicative. Eligibility, terms and approval are decided by the sanctioning bank or authority.
          Nextgen is an independent consultancy and is not affiliated with any government body.
        </p>
      </Container>
    </Section>
  );
}
