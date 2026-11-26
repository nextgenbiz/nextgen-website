import { cn } from "@/lib/utils";

/**
 * Brand motif (Brand Guidelines p.13): two dots and a triangle in
 * Impact Blue, Heavenly Blue and Champion Blue. Used as a graphic device,
 * cropped or placed at the edge of layouts. Never competes with the logo.
 */

/** Small lock-up of the motif, as it sits on the logo. */
export function MotifMark({ className, tone = "light" }) {
  // On dark backgrounds the triangle switches to Impact Blue so it stays visible.
  const tri = tone === "dark" ? "#0F42C0" : "#101D32";
  return (
    <svg
      viewBox="0 0 64 20"
      aria-hidden="true"
      className={cn("h-4 w-auto", className)}
      fill="none"
    >
      <circle cx="9" cy="10" r="8" fill="#0F42C0" />
      <circle cx="29" cy="10" r="8" fill="#7A9FF9" />
      <path d="M42 2h20v16L42 2Z" fill={tri} transform="translate(0 0)" />
    </svg>
  );
}

/**
 * Large decorative composition: overlapping dots + a triangle wedge, sized
 * to its container. Mirrors the "motif as a graphic device" panel in the guide.
 */
export function MotifBackdrop({ className }) {
  return (
    <svg
      viewBox="0 0 520 520"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M520 220v300H190L520 220Z" fill="#0F42C0" />
      <circle cx="210" cy="190" r="132" fill="#0F42C0" />
      <circle cx="338" cy="300" r="132" fill="#7A9FF9" />
    </svg>
  );
}

/** Standalone dot (used in lists and small accents). */
export function Dot({ className, color = "bg-impact" }) {
  return <span aria-hidden="true" className={cn("inline-block h-2 w-2 rounded-full", color, className)} />;
}
