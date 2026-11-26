"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** "On this page" navigation with scroll-spy. items: [{ id, label }] */
export default function PageToc({ items, className, orientation = "vertical" }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const horizontal = orientation === "horizontal";
  return (
    <nav aria-label="On this page" className={className}>
      <ul className={cn(horizontal ? "scrollbar-none flex gap-2 overflow-x-auto" : "space-y-0.5 border-l border-line")}>
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id} className={horizontal ? "shrink-0" : undefined}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  horizontal
                    ? "block rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
                    : "-ml-px block border-l-2 py-2 pl-4 text-[15px] font-medium transition-colors",
                  horizontal
                    ? on ? "border-impact bg-impact text-white" : "border-line bg-white text-champion"
                    : on ? "border-impact text-impact" : "border-transparent text-champion/70 hover:text-champion"
                )}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
