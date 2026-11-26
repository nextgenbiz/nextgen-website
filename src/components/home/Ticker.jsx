import { TICKER } from "@/data/content";

/** Slow-moving list of services. Pauses on hover; motion is removed for reduced-motion users. */
export default function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="marquee overflow-hidden border-b border-line bg-white" aria-label="Services we offer">
      <div className="marquee-track flex w-max items-center py-5" aria-hidden="false">
        {items.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-[15px] font-semibold text-champion" aria-hidden={i >= TICKER.length}>
            <span className="px-7">{t}</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-heaven" />
          </span>
        ))}
      </div>
    </div>
  );
}
