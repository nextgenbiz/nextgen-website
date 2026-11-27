import { TICKER } from "@/data/content";

/**
 * One seamless, infinite marquee of bold wordmark-style service names: dark and soft-grey words alternate,
 * wide spacing, fading at both edges. The track holds two identical copies and slides exactly -50%, so the
 * loop has no jump. Pauses on hover; still (and scrollable) for visitors who ask for reduced motion.
 * Decorative: a plain list is provided for screen readers.
 */
export default function Ticker() {
  return (
    <section aria-label="Services we offer" className="border-b border-line bg-white">
      <ul className="sr-only">
        {TICKER.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="marquee overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:py-7 motion-reduce:overflow-x-auto"
      >
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {TICKER.map((t, i) => (
                <li
                  key={t}
                  className={
                    "cursor-default whitespace-nowrap px-6 font-display font-extrabold text-[1.3rem] uppercase leading-none tracking-tight transition-colors duration-300 md:px-9 md:text-[1.65rem] " +
                    (i % 2 === 0
                      ? "text-champion hover:text-impact"
                      : "text-champion/50 hover:text-impact")
                  }
                >
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
