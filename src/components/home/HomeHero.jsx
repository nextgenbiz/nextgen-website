import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Star } from "@/components/ui/icons";
import { Container } from "@/components/ui/Section";
import ApplyButton from "@/components/forms/ApplyButton";
import { AWARD } from "@/data/content";

/**
 * Neo-brutalist hero: white page, thick navy outlines, hard offset shadows, square corners,
 * flat brand colours. Smaller type than the other pages' heroes on purpose.
 */
const BTN =
  "inline-flex items-center justify-center gap-2 border-[3px] border-champion px-6 py-3 text-[15px] font-bold shadow-[5px_5px_0_0_#101D32] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#101D32] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-heaven";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-champion bg-white">
      {/* faint blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#101D32_1px,transparent_1px),linear-gradient(90deg,#101D32_1px,transparent_1px)] [background-size:44px_44px]"
      />

      <Container className="relative grid items-center gap-12 pb-16 pt-28 md:pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-32">
        <div className="lg:col-span-6">
          <p className={`mb-6 inline-block -rotate-1 text-white border-[3px] border-champion bg-heaven px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-champion shadow-[3px_3px_0_0_#101D32] animate-rise`}>
            Business consultancy · Startups &amp; MSMEs
          </p>

          <h1 className="animate-rise font-display text-[2.1rem] leading-[1.08] tracking-tight text-champion [animation-delay:80ms] sm:text-[2.6rem] lg:text-[3rem]">
            Your vision.
            <br />
            <span className="my-1 inline-block bg-impact px-2.5 pb-0.5 text-white">Our execution.</span>
            <br />
            Zero obstacles.
          </h1>

          <p className="mt-6 max-w-lg animate-rise text-base leading-relaxed text-champion/80 [animation-delay:160ms]">
            Business is not a journey, it&apos;s an <strong className="font-bold text-champion">expedition</strong>. Every
            challenge is a mountain; every success opens a <strong className="font-bold text-champion">new world</strong>.
          </p>

          <div className="mt-8 flex flex-col gap-4 animate-rise [animation-delay:240ms] sm:flex-row">
            <Link href="/contact" className={`${BTN} bg-impact text-white`}>
              Get started today <ArrowRight className="h-4 w-4" />
            </Link>
            <ApplyButton service="Free Consultation Booking" className={`${BTN} bg-white text-champion`}>
              Schedule consultation
            </ApplyButton>
          </div>
        </div>

        {/* Illustration in a hard-edged frame, with the two proof points stuck on as stickers */}
        <div className="relative lg:col-span-6">
          <div className={`relative border-[3px] border-champion bg-white p-3 shadow-[10px_10px_0_0_#0F42C0] sm:p-5`}>
            <Image
              src="/images/hero-home-teamwork.webp"
              alt="A team building together on puzzle pieces towards growth: a target, an idea, a checklist and a rocket launching"
              width={1123}
              height={839}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <p data-icon-trigger className="absolute -left-2 -top-5 flex -rotate-3 items-center gap-1.5 border-[3px] border-champion bg-white px-3 py-1.5 text-sm font-extrabold text-champion shadow-[4px_4px_0_0_#101D32] sm:-left-5">
            <Star className="h-4 w-4 fill-impact text-impact" aria-hidden="true" /> 4.9 on Google
          </p>
          <p data-icon-trigger className="absolute -bottom-6 right-2 flex max-w-[15rem] rotate-2 items-center gap-2 border-[3px] border-champion bg-heaven px-3 py-2 text-[13px] font-extrabold leading-tight text-white shadow-[4px_4px_0_0_#101D32] sm:right-6">
            <Award className="h-4 w-4 shrink-0" aria-hidden="true" /> {AWARD.title}
          </p>
        </div>
      </Container>
    </section>
  );
}
