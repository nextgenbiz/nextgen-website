"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "@/components/ui/icons";
import { SERVICES, CATEGORIES } from "@/data/services";
import { cn } from "@/lib/utils";

const TABS = [{ value: "all", label: "All services" }, ...CATEGORIES];

export default function ServiceExplorer() {
  const params = useSearchParams();
  const initial = TABS.some((t) => t.value === params.get("category")) ? params.get("category") : "all";
  const [active, setActive] = useState(initial);
  const list = active === "all" ? SERVICES : SERVICES.filter((s) => s.category === active);
  const catLabel = (v) => CATEGORIES.find((c) => c.value === v)?.label;

  return (
    <div>
      <div role="tablist" aria-label="Service categories" className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {TABS.map((t) => {
          const on = active === t.value;
          return (
            <button
              key={t.value}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(t.value)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                on ? "border-impact bg-impact text-white" : "border-line bg-white text-champion hover:border-champion"
              )}
            >
              {t.label}
              <span className={cn("ml-2 text-xs", on ? "text-white/70" : "text-mute")}>
                {t.value === "all" ? SERVICES.length : SERVICES.filter((s) => s.category === t.value).length}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {list.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.slug}>
              <Link
                href={`/service/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-impact hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-impact-50 text-impact transition-colors group-hover:bg-impact group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-mute transition group-hover:text-impact" aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-mute">{catLabel(s.category)}</p>
                <h3 className="mt-1.5 text-h4 font-semibold text-champion">{s.title}</h3>
                <p className="mt-2 text-[15px] text-champion/75">{s.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
