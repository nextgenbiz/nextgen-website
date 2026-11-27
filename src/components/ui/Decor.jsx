import { cn } from "@/lib/utils";

/**
 * Small, calm decoration pieces in the Nextgen blues. All purely visual (aria-hidden) and quiet:
 * use one or two per section, never a pile.
 */

/** A key word in a heading, set in a thin Impact Blue "selection box" with corner handles. */
export function Highlight({ children, className }) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap rounded-[3px] border-[1.5px] border-impact bg-impact/[0.07] px-[0.18em] text-impact", className)}>
      {children}
      {["-left-[5px] -top-[5px]", "-right-[5px] -top-[5px]", "-bottom-[5px] -left-[5px]", "-bottom-[5px] -right-[5px]"].map((p) => (
        <span key={p} aria-hidden="true" className={cn("absolute h-[9px] w-[9px] rounded-full bg-impact", p)} />
      ))}
    </span>
  );
}

/** Four rounded tiles, each with one big round corner. Sit it half off the edge of a tinted section. */
export function Tiles({ className, color = "bg-heaven-200" }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none grid grid-cols-2 grid-rows-2 gap-[3%]", className)}>
      <span className={cn(color, "rounded-br-[100%]")} />
      <span className={cn(color, "rounded-bl-[100%]")} />
      <span className={cn(color, "rounded-tr-[100%]")} />
      <span className={cn(color, "rounded-tl-[100%]")} />
    </span>
  );
}

/** Soft starburst. `color` is any CSS colour. */
export function Burst({ className, color = "#C7D7FC" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={cn("pointer-events-none", className)}>
      <g stroke={color} strokeWidth="15" strokeLinecap="round">
        {[0, 36, 72, 108, 144].map((r) => (
          <line key={r} x1="50" y1="10" x2="50" y2="90" transform={`rotate(${r} 50 50)`} />
        ))}
      </g>
    </svg>
  );
}

/** Round "drawing pin" for pinned-note cards. */
export function Pin({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute z-20 h-5 w-5 rounded-full bg-impact shadow-[0_3px_6px_rgba(16,29,50,.3)] ring-4 ring-white", className)}
    />
  );
}
