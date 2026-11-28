import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { PopPeep } from "@/components/illustrations/PeepScene";

const STEPS = [
  {
    peep: 102,
    title: "Tell us your goal",
    text: "Share your idea or requirement in a quick conversation. We listen first, then recommend the right route.",
  },
  {
    peep: 92,
    title: "Share your documents",
    text: "We tell you exactly what is needed and check everything before anything is filed.",
  },
  {
    peep: 11,
    title: "We file and follow up",
    text: "Registrations, certificates and applications are handled end to end by our experts.",
  },
  {
    peep: 28,
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
        <ol className="scrollbar-none -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            return (
              <Reveal key={s.title} as="li" delay={i * 0.07} className="relative flex w-[72vw] max-w-[17rem] shrink-0 snap-start flex-col rounded-3xl border border-line bg-white p-6 md:w-auto md:max-w-none md:p-7">
                <PopPeep id={s.peep} className="mx-auto mt-10 w-28 md:mt-14 md:w-40" />
                <span className="absolute left-6 top-6 font-display text-3xl text-impact/25 md:left-7 md:top-7">0{i + 1}</span>
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
