import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "@/components/ui/icons";
import { Container } from "./Section";

/**
 * White hero used at the top of every inner page. The photo sits behind the text, full height on the right, and
 * fades out into the white page towards the left (and the bottom), so the headline always stays on clean white.
 * Every hero has the same height (the content is centred in it), so pages feel consistent. The fixed white header
 * sits above it, so the top padding clears the header height. No photo = plain white.
 * The photo is decoration only; the heading and lead carry the meaning.
 */
export default function PageHero({ eyebrow, title, lead, crumbs = [], children, image }) {
  return (
    <section className="relative isolate flex min-h-[35rem] overflow-hidden border-b border-line bg-white">
      {image && (
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[74%]">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 74vw, 100vw"
            className="object-cover object-center opacity-70 lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_58%)]"
          />
          {/* phones/tablets: keep the text readable over the whole photo */}
          <div className="absolute inset-0 bg-white/70 lg:hidden" />
          {/* soft fade into the page at the bottom edge */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>
      )}

      <Container className="flex w-full items-center pb-8 pt-[5.5rem]">
        <div className="max-w-xl lg:max-w-[35rem]">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-mute">
                <li>
                  <Link href="/" className="hover:text-impact">Home</Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <ChevronRight animated={false} className="h-3.5 w-3.5" />
                    {c.href ? (
                      <Link href={c.href} className="hover:text-impact">{c.label}</Link>
                    ) : (
                      <span className="text-champion" aria-current="page">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className="mb-4 inline-block rounded-full border border-line bg-white/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-champion backdrop-blur">
              {eyebrow}
            </p>
          )}
          <h1 className="h1 !text-[2.15rem] !leading-[1.1] md:!text-[3rem]">{title}</h1>
          {lead && <p className="lead mt-4 !text-champion/85">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
