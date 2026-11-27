"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "@/components/ui/icons";
import Logo from "@/components/ui/Logo";
import { MotifMark } from "@/components/ui/Motif";
import { useContactModal } from "@/components/forms/ContactModalProvider";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Fixed header: a white bar with the full-colour logo on every page (guideline: right logo, right background).
 * While the mobile drawer is open it turns Champion Blue with the white logo.
 */
export default function Header() {
  const pathname = usePathname();
  const { open } = useContactModal();
  const [menu, setMenu] = useState(false);

  // close the drawer on navigation
  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  // every page opens on a white hero, so the bar is white everywhere; only the open mobile drawer is dark
  const solid = !menu;
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          solid ? "border-b border-line bg-white/95 backdrop-blur" : "border-b border-transparent bg-champion"
        )}
      >
        <div className="container flex h-[4.5rem] items-center justify-between gap-6">
          <Logo variant={solid ? "color" : "white"} width={142} priority />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-2.5 py-2 text-[15px] font-medium transition-colors xl:px-4",
                    solid ? "text-champion hover:text-impact" : "text-white/85 hover:text-white",
                    active && (solid ? "text-impact" : "text-white")
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className={cn("absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full xl:inset-x-4", solid ? "bg-impact" : "bg-heaven")}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SITE.phoneHref}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap text-[15px] font-semibold transition-colors",
                solid ? "text-champion hover:text-impact" : "text-white hover:text-heaven"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">{SITE.phone}</span>
              <span className="sr-only xl:hidden">Call {SITE.phone}</span>
            </a>
            <button
              type="button"
              onClick={() => open("")}
              className={cn("btn whitespace-nowrap !px-5 !py-2.5", solid ? "btn-primary" : "btn-light")}
            >
              Free consultation
            </button>
          </div>

          <button
            type="button"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden",
              solid ? "border-line text-champion" : "border-white/30 text-white"
            )}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "on-dark fixed inset-0 z-40 bg-champion pt-[4.5rem] transition-opacity duration-300 lg:hidden",
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menu}
      >
        <div className="container flex h-full flex-col pb-10 pt-8">
          <MotifMark tone="dark" className="mb-6" />
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={menu ? 0 : -1}
                className={cn(
                  "border-b border-white/10 py-4 text-3xl font-bold tracking-tight transition-colors",
                  isActive(item.href) ? "text-heaven" : "text-white hover:text-heaven"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3 pt-8">
            <button
              type="button"
              tabIndex={menu ? 0 : -1}
              onClick={() => {
                setMenu(false);
                open("");
              }}
              className="btn btn-light btn-lg w-full"
            >
              Free consultation
            </button>
            <a href={SITE.phoneHref} tabIndex={menu ? 0 : -1} className="btn btn-outline-light btn-lg w-full">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
