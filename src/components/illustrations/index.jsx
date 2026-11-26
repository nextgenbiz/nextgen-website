/**
 * Nextgen spot illustrations. Flat, geometric, drawn from the brand motif and the three brand blues
 * so they read as part of the identity (not stock art). All are decorative: aria-hidden by default.
 */

const I = "#0F42C0"; // Impact Blue
const H = "#7A9FF9"; // Heavenly Blue
const C = "#101D32"; // Champion Blue
const T1 = "#EEF3FD"; // Impact tint
const T2 = "#DCE6FB"; // deeper tint
const W = "#FFFFFF";

function Svg({ viewBox, className, children, title }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

/** Brand confetti: dots and a triangle scattered as accents. */
function Accents({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="7" fill={I} />
      <circle cx="20" cy="6" r="7" fill={H} />
      <path d="M38 -6h16v14L38 -6Z" fill={C} />
    </g>
  );
}

/* ------------------------------------------------------------------ steps (240 x 180) */

export function StepConsult({ className }) {
  return (
    <Svg viewBox="0 0 240 180" className={className}>
      <circle cx="120" cy="92" r="74" fill={T1} />
      {/* bubble A */}
      <path d="M52 58a16 16 0 0 1 16-16h76a16 16 0 0 1 16 16v38a16 16 0 0 1-16 16H92l-22 18v-18H68a16 16 0 0 1-16-16V58Z" fill={I} />
      <rect x="70" y="60" width="66" height="7" rx="3.5" fill={W} />
      <rect x="70" y="74" width="46" height="7" rx="3.5" fill={W} fillOpacity=".6" />
      {/* bubble B */}
      <path d="M104 104a16 16 0 0 1 16-16h56a16 16 0 0 1 16 16v28a16 16 0 0 1-16 16h-2v16l-20-16h-34a16 16 0 0 1-16-16v-28Z" transform="translate(6 4)" fill={H} />
      <circle cx="132" cy="122" r="5" fill={W} />
      <circle cx="148" cy="122" r="5" fill={W} />
      <circle cx="164" cy="122" r="5" fill={W} />
      <Accents x={182} y={46} />
    </Svg>
  );
}

export function StepDocuments({ className }) {
  return (
    <Svg viewBox="0 0 240 180" className={className}>
      <circle cx="120" cy="92" r="74" fill={T1} />
      {/* back sheet */}
      <g transform="rotate(-8 100 100)">
        <rect x="64" y="40" width="86" height="112" rx="10" fill={T2} />
      </g>
      {/* front sheet */}
      <rect x="86" y="34" width="88" height="114" rx="10" fill={W} />
      <rect x="86" y="34" width="88" height="114" rx="10" stroke={T2} strokeWidth="2" />
      <rect x="102" y="52" width="40" height="8" rx="4" fill={I} />
      <rect x="102" y="70" width="56" height="6" rx="3" fill={T2} />
      <rect x="102" y="84" width="56" height="6" rx="3" fill={T2} />
      <rect x="102" y="98" width="38" height="6" rx="3" fill={T2} />
      {/* approved tick */}
      <circle cx="168" cy="132" r="24" fill={I} />
      <path d="M157 132l8 8 14-16" stroke={W} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <Accents x={42} y={50} />
    </Svg>
  );
}

export function StepFiling({ className }) {
  return (
    <Svg viewBox="0 0 240 180" className={className}>
      <circle cx="120" cy="92" r="74" fill={T1} />
      {/* shield */}
      <path d="M120 32l44 16v36c0 30-18 50-44 62-26-12-44-32-44-62V48l44-16Z" fill={I} />
      <path d="M120 32l44 16v36c0 30-18 50-44 62V32Z" fill={C} fillOpacity=".18" />
      <path d="M102 92l14 14 26-30" stroke={W} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* stamped file */}
      <rect x="28" y="108" width="52" height="44" rx="8" fill={H} />
      <rect x="38" y="120" width="30" height="6" rx="3" fill={W} />
      <rect x="38" y="132" width="20" height="6" rx="3" fill={W} fillOpacity=".6" />
      <circle cx="190" cy="56" r="8" fill={I} />
      <circle cx="208" cy="62" r="8" fill={H} />
      <path d="M196 120h18v16l-18-16Z" fill={C} />
    </Svg>
  );
}

export function StepGrowth({ className }) {
  return (
    <Svg viewBox="0 0 240 180" className={className}>
      <circle cx="120" cy="92" r="74" fill={T1} />
      <rect x="60" y="108" width="26" height="40" rx="6" fill={T2} />
      <rect x="94" y="88" width="26" height="60" rx="6" fill={H} />
      <rect x="128" y="64" width="26" height="84" rx="6" fill={I} />
      <rect x="162" y="40" width="26" height="108" rx="6" fill={C} />
      <path d="M62 84l36-22 30 8 52-40" stroke={I} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M168 24h24v24" stroke={I} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="120" cy="152" rx="82" ry="6" fill={T2} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ scenes */

/** Contact: a friendly support avatar with headset and speech bubbles (360 x 300). */
export function SupportScene({ className }) {
  return (
    <Svg viewBox="0 0 360 300" className={className}>
      <circle cx="180" cy="150" r="128" fill={T1} />
      <ellipse cx="180" cy="270" rx="120" ry="10" fill={T2} />
      {/* shoulders */}
      <path d="M96 268c0-52 36-76 84-76s84 24 84 76H96Z" fill={I} />
      <path d="M150 196l30 34 30-34" stroke={W} strokeWidth="6" strokeLinejoin="round" fill="none" strokeOpacity=".5" />
      {/* neck + head */}
      <rect x="166" y="170" width="28" height="30" rx="10" fill="#E6B99A" />
      <circle cx="180" cy="140" r="42" fill="#F2C9AC" />
      {/* hair */}
      <path d="M138 138c-2-34 22-52 46-50 26 2 40 22 38 50-10-14-26-22-44-22-16 0-30 8-40 22Z" fill={C} />
      {/* headset */}
      <path d="M132 144c-4-44 24-66 52-62 26 3 44 26 40 62" stroke={H} strokeWidth="9" strokeLinecap="round" fill="none" />
      <rect x="120" y="136" width="20" height="34" rx="9" fill={H} />
      <rect x="220" y="136" width="20" height="34" rx="9" fill={H} />
      <path d="M232 168c0 18-14 28-34 28" stroke={H} strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="196" cy="196" r="7" fill={C} />
      {/* eyes + smile */}
      <circle cx="166" cy="146" r="3.5" fill={C} />
      <circle cx="194" cy="146" r="3.5" fill={C} />
      <path d="M168 160c6 8 18 8 24 0" stroke={C} strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* bubbles */}
      <path d="M40 66a14 14 0 0 1 14-14h72a14 14 0 0 1 14 14v28a14 14 0 0 1-14 14h-52l-20 16v-16h-0a14 14 0 0 1-14-14V66Z" fill={W} />
      <path d="M40 66a14 14 0 0 1 14-14h72a14 14 0 0 1 14 14v28a14 14 0 0 1-14 14h-52l-20 16v-16a14 14 0 0 1-14-14V66Z" stroke={T2} strokeWidth="2" />
      <circle cx="68" cy="80" r="5" fill={I} />
      <circle cx="88" cy="80" r="5" fill={H} />
      <circle cx="108" cy="80" r="5" fill={C} />
      <path d="M232 40a14 14 0 0 1 14-14h66a14 14 0 0 1 14 14v26a14 14 0 0 1-14 14h-4v16l-20-16h-42a14 14 0 0 1-14-14V40Z" fill={I} />
      <rect x="250" y="40" width="50" height="7" rx="3.5" fill={W} />
      <rect x="250" y="54" width="34" height="7" rx="3.5" fill={W} fillOpacity=".6" />
      <Accents x={300} y={190} />
    </Svg>
  );
}

/** Solutions: funding growth scene with coins, bars and a shield (360 x 300). */
export function FundingScene({ className }) {
  return (
    <Svg viewBox="0 0 360 300" className={className}>
      <circle cx="180" cy="150" r="128" fill={T1} />
      <ellipse cx="180" cy="266" rx="132" ry="10" fill={T2} />
      {/* panel */}
      <rect x="70" y="70" width="220" height="170" rx="18" fill={W} />
      <rect x="70" y="70" width="220" height="170" rx="18" stroke={T2} strokeWidth="2" />
      <rect x="90" y="88" width="64" height="9" rx="4.5" fill={C} />
      <rect x="90" y="104" width="40" height="7" rx="3.5" fill={T2} />
      {/* bars */}
      <rect x="96" y="176" width="28" height="44" rx="7" fill={T2} />
      <rect x="134" y="154" width="28" height="66" rx="7" fill={H} />
      <rect x="172" y="132" width="28" height="88" rx="7" fill={I} />
      <rect x="210" y="108" width="28" height="112" rx="7" fill={C} />
      <path d="M100 150l40-24 34 10 56-46" stroke={I} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M212 90h18v18" stroke={I} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* coins */}
      <circle cx="274" cy="214" r="28" fill={H} />
      <circle cx="274" cy="214" r="20" stroke={W} strokeWidth="4" />
      <rect x="268" y="204" width="12" height="20" rx="3" fill={W} fillOpacity=".0" />
      <path d="M266 206h16M266 214h16M270 206c10 0 10 10 0 10l12 10" stroke={W} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="300" cy="190" r="16" fill={I} />
      <circle cx="300" cy="190" r="10" stroke={W} strokeWidth="3" />
      {/* shield badge */}
      <path d="M76 56l22 8v18c0 15-9 25-22 31-13-6-22-16-22-31V64l22-8Z" fill={I} transform="translate(-24 -22)" />
      <path d="M62 88l8 8 14-16" stroke={W} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-24 -22) translate(4 -4)" />
      <Accents x={262} y={52} />
    </Svg>
  );
}

/** Form success: check burst with brand confetti (200 x 160). */
export function SuccessBurst({ className }) {
  return (
    <Svg viewBox="0 0 200 160" className={className}>
      <circle cx="100" cy="82" r="62" fill={T1} />
      <circle cx="100" cy="82" r="42" fill={I} />
      <path d="M82 82l14 14 26-30" stroke={W} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="40" r="7" fill={H} />
      <circle cx="170" cy="30" r="9" fill={I} />
      <circle cx="176" cy="116" r="6" fill={H} />
      <circle cx="24" cy="112" r="8" fill={I} />
      <path d="M150 140h20v-18l-20 18Z" fill={C} />
      <path d="M44 14h16v14L44 14Z" fill={C} />
    </Svg>
  );
}
