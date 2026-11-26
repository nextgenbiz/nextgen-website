import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { StepConsult, StepDocuments, StepFiling, StepGrowth } from "@/components/illustrations";

const STEPS = [
  {
    art: StepConsult,
    title: "Tell us your goal",
    text: "Share your idea or requirement in a quick conversation. We listen first, then recommend the right route.",
  },
  {
    art: StepDocuments,
    title: "Share your documents",
    text: "We tell you exactly what is needed and check everything before anything is filed.",
  },
  {
    art: StepFiling,
    title: "We file and follow up",
    text: "Registrations, certificates and applications are handled end to end by our experts.",
  },
  {
    art: StepGrowth,
    title: "You grow",
    text: "Funding, compliance and marketing support continue as your business scales.",
  },
];

export default function HowItWorks() {
  return (
    <Section tone="surface" id="how-it-works">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From first call to done, in four steps."
          lead="Aapke paas vision hai, hum handle karenge chaos."
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Art = s.art;
            return (
              <Reveal key={s.title} as="li" delay={i * 0.07} className="relative flex flex-col rounded-3xl border border-line bg-white p-6 md:p-7">
                <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-champion font-display text-sm text-white">{i + 1}</span>
                <Art className="mx-auto w-full max-w-[15rem]" />
                <h3 className="h4 mt-4">{s.title}</h3>
                <p className="mt-2 text-[15px] text-champion/75">{s.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
