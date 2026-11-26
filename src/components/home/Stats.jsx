import { Container, Section } from "@/components/ui/Section";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { to: 80, suffix: "+", label: "Solutions", note: "Across registration, compliance and funding" },
  { to: 4.9, decimals: 1, label: "Google rating", note: "Rated highly by clients and verified authorities" },
  { to: 3, label: "Cities", note: "Ahmedabad, Pune and Chennai" },
];

export default function Stats() {
  return (
    <Section tone="brand" className="!py-14 md:!py-20">
      <Container>
        <div className="mb-10 md:mb-14">
          <p className="eyebrow mb-3 !text-heaven-200">Our impact in numbers</p>
          <h2 className="h2 max-w-xl">Driving innovation and excellence, one business at a time.</h2>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-2xl bg-white/20 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-impact p-7 md:p-9">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-heaven-200">{s.label}</dt>
              <dd className="mt-3 font-display text-[3.25rem] leading-none text-white md:text-6xl">
                <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <dd className="mt-3 text-[15px] text-white/80">{s.note}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
