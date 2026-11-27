/**
 * People illustrations: Open Peeps by Pablo Stanley (CC0 / public domain, https://www.openpeeps.com),
 * recoloured to Champion Blue. Shown as "pop-out" portraits: the person stands in a circle, the circle cuts
 * the body at its lower arc and the head rises above it. Decorative: the surrounding copy carries the meaning.
 */

/**
 * "Pop-out" portrait: a small circle with the person standing in it. The person is clipped by the
 * circle's lower arc (so the body ends exactly on the circle), while the head and shoulders rise
 * above the circle. Needs <PopClipDefs /> rendered once on the page.
 */
export function PopClipDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        {/* box units: x 0..1 across the circle, open to the top, bottom edge follows the circle's arc */}
        <clipPath id="peep-pop" clipPathUnits="objectBoundingBox">
          <path d="M0,-1 H1 V0.5 A0.5,0.5 0 0 1 0,0.5 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function PopPeep({ id, tone = "bg-heaven", className = "" }) {
  return (
    <div aria-hidden="true" className={`relative aspect-square ${className}`}>
      <div className={`absolute inset-0 rounded-full ${tone} [clip-path:url(#peep-pop)]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/illustrations/peeps/peep-${id}.svg`}
          alt=""
          width={240}
          height={324}
          loading="lazy"
          decoding="async"
          className="absolute -bottom-[22%] left-1/2 h-[152%] w-auto max-w-none -translate-x-1/2"
        />
      </div>
    </div>
  );
}

/** Two portraits on overlapping brand circles; the dark one sits behind the first person. */
export function PopPair({ peeps = [102, 28], className = "" }) {
  const [a, b] = peeps;
  return (
    <div aria-hidden="true" className={`relative h-60 w-72 ${className}`}>
      <div className="absolute bottom-0 left-0 z-10 w-44">
        <PopPeep id={a} tone="bg-heaven" />
      </div>
      <div className="absolute bottom-0 left-32 z-0 w-36">
        <PopPeep id={b} tone="bg-impact" />
      </div>
    </div>
  );
}
