import Image from "next/image";
import { Award } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { PopPair } from "@/components/illustrations/PeepScene";
import { AWARD } from "@/data/content";

/**
 * Award section: headline on the left, one large stage photo with a second photo laid over its corner on the right,
 * and two relaxed (arms-crossed) people from Open Peeps (CC0) as pop-out portraits on overlapping circles, bottom-left.
 */
export default function Recognition() {
  return (
    <Section className="relative overflow-hidden !pb-3">
      <Container className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <div data-icon-trigger className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-center">
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-impact-50 text-impact">
            <Award className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="eyebrow mb-3">Recognition</p>
          <h2 className="h2">{AWARD.title}</h2>
          <p className="lead mt-4">{AWARD.caption}</p>
          <p className="mt-6 border-l-2 border-impact pl-4 text-sm font-semibold text-champion">{AWARD.by}</p>
        </div>

        {/* photos: big one + a smaller one overlapping its bottom-right corner, over two brand circles */}
        <div className="relative pb-14 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:pb-20 lg:pt-6">
          <span aria-hidden="true" className="absolute -right-3 top-0 h-28 w-28 rounded-full bg-heaven lg:h-36 lg:w-36" />
          <span aria-hidden="true" className="absolute -left-4 bottom-24 h-14 w-14 rounded-full bg-impact lg:bottom-28" />

          <Reveal className="relative z-10 aspect-[16/10] overflow-hidden rounded-3xl bg-surface shadow-lift">
            <Image
              src="/assets/awards/stage-1.webp"
              alt="The Nextgen team receiving the Most Trusted Advisory Business of the Year award on stage"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal
            delay={0.1}
            className="absolute -bottom-0 right-4 z-20 aspect-[4/3] w-[46%] rotate-2 overflow-hidden rounded-2xl border-[5px] border-white bg-surface shadow-lift lg:right-8 lg:-bottom-0"
          >
            <Image
              src="/assets/awards/stage-2.webp"
              alt="Nextgen leadership with the Outlook Business Spotlight award"
              fill
              sizes="(min-width: 1024px) 26vw, 46vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        {/* two relaxed people: overlapping brand circles, bodies cut by the circles, heads rising above */}
        <PopPair peeps={[35, 66]} className="mx-auto lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:self-end" />
      </Container>
    </Section>
  );
}
