import Link from "next/link";
import { ArrowRight, Award, Star } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { MotifBackdrop } from "@/components/ui/Motif";
import ApplyButton from "@/components/forms/ApplyButton";
import { HOME_FEATURES, AWARD } from "@/data/content";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-champion on-dark">
      <Container className="relative grid items-center gap-12 pb-12 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-44">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5 animate-rise">Business consultancy · Startups &amp; MSMEs</p>

          <h1 className="h1 animate-rise [animation-delay:80ms] md:!text-[4rem] md:!leading-[1.05]">
            Your vision.
            <br />
            <span className="text-heaven">Our execution.</span>
            <br />
            Zero obstacles.
          </h1>

          <p className="lead mt-6 max-w-xl animate-rise [animation-delay:160ms] md:text-xl">
            Business is not a journey, it&apos;s an <strong className="font-semibold text-white">expedition</strong>. Every
            challenge is a mountain; every success opens a <strong className="font-semibold text-white">new world</strong>.
          </p>

          <div className="mt-9 flex flex-col gap-3 animate-rise [animation-delay:240ms] sm:flex-row">
            <Link href="/contact" className="btn btn-light btn-lg">
              Get started today <ArrowRight className="h-4 w-4" />
            </Link>
            <ApplyButton service="Free Consultation Booking" className="btn btn-outline-light btn-lg">
              Schedule consultation
            </ApplyButton>
          </div>

          {/* proof points: visible on small screens where the panel is hidden */}
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80 lg:hidden">
            <li className="flex items-center gap-2"><Star className="h-4 w-4 fill-heaven text-heaven" /> 4.9 on Google</li>
            <li className="flex items-center gap-2"><Award className="h-4 w-4 text-heaven" /> Most Trusted Advisory Business 2026</li>
          </ul>
        </div>

        {/* Brand panel: motif as a graphic device with credentials on top */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative aspect-[1/1.02] overflow-hidden rounded-[2rem] bg-champion-800 ring-1 ring-white/10">
            <MotifBackdrop />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-2xl bg-champion/80 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 fill-heaven text-heaven" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl leading-none text-white">4.9</p>
                  <p className="mt-1 text-xs text-white/65">Google rating</p>
                </div>
              </div>
              <p className="text-right text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                80+
                <br />
                solutions
              </p>
            </div>
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white p-5 shadow-lift">
              <div className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-impact-50 text-impact">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[15px] font-bold leading-snug text-champion">{AWARD.title}</p>
                  <p className="mt-1 text-xs text-mute">Outlook Business · Spotlight 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* three pillars */}
      <Container className="relative pb-12 md:pb-16">
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {HOME_FEATURES.map((f, i) => (
            <li key={f.title} className="bg-champion p-6 md:p-8">
              <p className="text-sm font-bold text-heaven">0{i + 1}</p>
              <h2 className="mt-3 text-h4 font-semibold text-white">{f.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{f.desc}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
