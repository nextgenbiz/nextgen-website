"use client";

import { useId, useState } from "react";
import { Plus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Accessible single-open accordion. items: [{ question, answer }] */
export default function Accordion({ items, className, defaultOpen = 0, tone = "light" }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  const dark = tone === "dark";

  return (
    <div className={cn("divide-y", dark ? "divide-white/15 border-y border-white/15" : "divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-p${i}`;
        const btnId = `${base}-b${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className={cn("text-[17px] font-semibold leading-snug md:text-lg", dark ? "text-white" : "text-champion")}>
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors",
                    dark ? "border-white/25 text-white" : "border-line text-impact",
                    isOpen && (dark ? "border-heaven bg-heaven text-champion" : "border-impact bg-impact text-white")
                  )}
                >
                  <Plus className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-45")} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className={cn("max-w-3xl pb-6 text-base leading-relaxed", dark ? "text-white/75" : "text-champion/80")}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
