"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * One category at a time: tabs on top, then a photo + the services of that category.
 * Replaces three tall stacked cards, so the whole section fits on one phone screen.
 * data: [{ value, label, blurb, count, cover: {src, alt}, items: [{slug, title}], more }]
 */
export default function ServiceTabs({ data }) {
  const [active, setActive] = useState(data[0].value);
  const tabRefs = useRef({});

  const onKeyDown = (e, i) => {
    const key = e.key;
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(key)) return;
    e.preventDefault();
    const next = key === "Home" ? 0 : key === "End" ? data.length - 1 : (i + (key === "ArrowRight" ? 1 : -1) + data.length) % data.length;
    setActive(data[next].value);
    tabRefs.current[data[next].value]?.focus();
  };

  const current = data.find((d) => d.value === active);

  return (
    <div className="mt-8 md:mt-10">
      <div role="tablist" aria-label="Service categories" className="grid grid-cols-3 gap-1.5 rounded-2xl bg-surface p-1.5 ring-1 ring-line">
        {data.map((d, i) => {
          const on = d.value === active;
          return (
            <button
              key={d.value}
              ref={(el) => (tabRefs.current[d.value] = el)}
              role="tab"
              type="button"
              id={`svc-tab-${d.value}`}
              aria-selected={on}
              aria-controls={`svc-panel-${d.value}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(d.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex min-h-[3rem] flex-col items-center justify-center rounded-xl px-2 py-2 text-center text-[13px] font-semibold leading-tight transition sm:flex-row sm:gap-2 sm:text-[15px]",
                on ? "bg-impact text-white shadow-lift" : "text-champion hover:bg-white"
              )}
            >
              <span>{d.label}</span>
              <span className={cn("text-xs font-bold", on ? "text-white/80" : "text-impact")}>{String(d.count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`svc-panel-${current.value}`}
        aria-labelledby={`svc-tab-${current.value}`}
        className="mt-4 grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div className="relative h-24 border-b border-line bg-surface sm:h-44 md:h-auto md:min-h-[17rem] md:border-b-0 md:border-r">
          <Image
            key={current.value}
            src={current.cover.src}
            alt={current.cover.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="p-5 md:p-7">
          <p className="text-[15px] text-mute">{current.blurb}</p>
          <ul className="mt-3 divide-y divide-line border-t border-line">
            {current.items.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/service/${s.slug}`}
                  className="group flex items-center justify-between gap-3 py-2.5 text-[15px] font-medium text-champion transition-colors hover:text-impact md:py-3"
                >
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-impact" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/solution?category=${current.value}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-impact hover:underline">
            {current.more > 0 ? `See all ${current.count} in ${current.label}` : `Explore ${current.label}`} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
