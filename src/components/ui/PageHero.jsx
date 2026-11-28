import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "@/components/ui/icons";
import { Container } from "./Section";
import { cn } from "@/lib/utils";

/**
 * Hero at the top of every inner page. It speaks the home hero's language so the site feels like one piece:
 * white page with a faint blueprint grid, square corners, 3px navy lines, a tilted blue tag, a solid blue block
 * behind the highlighted headline words, square buttons with hard shadows, and the illustration in a bordered
 * frame with a hard Impact Blue shadow and a sticker stuck on.
 *
 * Every hero has the same height (content centred) so pages feel consistent; the fixed white header sits above it,
 * so the top padding clears the header. The illustration is decoration only (hidden on phones); the heading and
 * lead carry the meaning.
 *
 * `image`   per-page illustration (wide, white background). Defaults to the home illustration.
 * `sticker` short text for the sticker on the illustration's corner.
 * `aside`   custom art shown in the frame instead of an image (used by the 404).
 *
 * Words wrapped in <span className="text-impact"> inside the title become the solid blue block. Buttons passed as
 * children (.btn) are restyled to the home hero's square, hard-shadow buttons.
 */

// Placeholder until a page gets its own illustration: the one the home hero uses.
const DEFAULT_ART = { src: "/images/hero-home-teamwork.webp", width: 1123, height: 839 };

const TITLE_BLOCK =
  "[&_.text-impact]:my-1 [&_.text-impact]:inline-block [&_.text-impact]:bg-impact [&_.text-impact]:px-2.5 [&_.text-impact]:pb-0.5 [&_.text-impact]:text-white";

const BUTTONS =
  "[&_.btn]:rounded-none [&_.btn-lg]:!py-3.5 [&_.btn]:border-[3px] [&_.btn]:border-champion [&_.btn]:font-bold [&_.btn]:shadow-[5px_5px_0_0_#101D32] [&_.btn]:transition [&_.btn:hover]:translate-x-[3px] [&_.btn:hover]:translate-y-[3px] [&_.btn:hover]:shadow-[2px_2px_0_0_#101D32] [&_.btn-outline]:bg-white [&_.btn-outline]:text-champion [&_.btn-outline:hover]:bg-white [&_.btn-outline:hover]:text-champion";

export default function PageHero({ eyebrow, title, lead, crumbs = [], children, image, aside, sticker }) {
  const art = image ? { src: image, width: 1500, height: 800 } : DEFAULT_ART;
  const sizes = "(min-width: 1024px) 50vw, 90vw";

  return (
    <section className="relative isolate flex overflow-hidden lg:min-h-[35rem] border-b-[3px] border-champion bg-white">
      {/* faint blueprint grid, as on the home hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(#101D32_1px,transparent_1px),linear-gradient(90deg,#101D32_1px,transparent_1px)] [background-size:44px_44px]"
      />

      <Container className="grid w-full items-center gap-8 pb-12 pt-[5.5rem] lg:grid-cols-12 lg:pb-8 lg:gap-8 lg:pt-[5.5rem]">
        <div className="lg:col-span-5">
          <div className="max-w-xl">
            {crumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-4">
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
              <p className="mb-4 inline-block -rotate-1 border-[3px] border-champion bg-heaven px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[3px_3px_0_0_#101D32]">
                {eyebrow}
              </p>
            )}
            <h1 className={cn("h1 !text-[2rem] !leading-[1.12] md:!text-[2.5rem] xl:!text-[2.7rem]", TITLE_BLOCK)}>{title}</h1>
            {lead && <p className="mt-4 text-base leading-relaxed text-champion/80">{lead}</p>}
            <div className={BUTTONS}>{children}</div>
          </div>
        </div>

        {/* illustration in a hard-edged frame, a sticker stuck on its corner */}
        <div aria-hidden="true" className={cn("relative mr-2 mt-2 lg:col-span-7 lg:mr-0 lg:mt-0", !image && !aside && "mx-auto w-full max-w-[26rem] lg:ml-auto lg:max-w-[30rem]")}>
          <div className="border-[3px] border-champion bg-white p-2 shadow-[6px_6px_0_0_#0F42C0] sm:p-3 lg:shadow-[10px_10px_0_0_#0F42C0]">
            {aside ? (
              <div className="grid aspect-[16/9] place-items-center bg-surface">{aside}</div>
            ) : (
              <Image src={art.src} alt="" width={art.width} height={art.height} sizes={sizes} className="h-auto w-full" />
            )}
          </div>
          {sticker && (
            <p className="absolute -bottom-4 right-2 max-w-[11rem] sm:max-w-[16rem] lg:-bottom-5 lg:right-4 rotate-2 border-[3px] border-champion bg-heaven px-3 py-2 text-xs font-extrabold leading-tight text-white shadow-[4px_4px_0_0_#101D32]">
              {sticker}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
