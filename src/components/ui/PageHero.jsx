import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Section";
import { MotifBackdrop } from "./Motif";

/**
 * Dark hero used at the top of every inner page. The fixed header sits over it
 * (transparent until scrolled), so the top padding clears the header height.
 */
export default function PageHero({ eyebrow, title, lead, crumbs = [], children, size = "md" }) {
  return (
    <section className="relative overflow-hidden bg-champion on-dark">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-24 hidden h-[125%] w-[38rem] opacity-90 md:block">
        <MotifBackdrop />
      </div>
      <Container className={size === "lg" ? "relative pb-16 pt-32 md:pb-20 md:pt-36" : "relative pb-12 pt-28 md:pb-14 md:pt-32"}>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">{c.label}</Link>
                  ) : (
                    <span className="text-white/90" aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-4xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="h1">{title}</h1>
          {lead && <p className="lead mt-5 max-w-2xl">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
