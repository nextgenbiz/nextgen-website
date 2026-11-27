import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import PageToc from "@/components/ui/PageToc";
import { Container, Section } from "@/components/ui/Section";
import { slugify } from "@/lib/utils";
import { SITE } from "@/lib/site";

/**
 * sections: [{ heading, blocks: [{ type: "p" | "ul" | "h3", text | items }] }]
 */
export default function LegalPage({ title, lead, updated, sections, crumb, docName }) {
  const toc = sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lead={lead}
        crumbs={[{ label: crumb }]}
        imageAlt="Modern glass corporate skyscraper representing corporate governance and transparency"
      >
        {updated && <p className="mt-5 text-sm text-mute">{updated}</p>}
      </PageHero>
      <Section>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="eyebrow mb-3">Contents</p>
              <PageToc items={toc} />
            </div>
          </aside>
          <article className="max-w-3xl space-y-12 lg:col-span-9">
            {sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-28">
                <h2 className="h3 mb-4">{s.heading}</h2>
                <div className="space-y-4 text-base leading-relaxed text-champion/85">
                  {s.blocks.map((b, i) => {
                    if (b.type === "h3") return <h3 key={i} className="h4 pt-2">{b.text}</h3>;
                    if (b.type === "ul")
                      return (
                        <ul key={i} className="space-y-2.5">
                          {b.items.map((it) => (
                            <li key={it} className="flex gap-3">
                              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-impact" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    return <p key={i}>{b.text}</p>;
                  })}
                </div>
              </section>
            ))}

            <section id="contact-us" className="scroll-mt-28 rounded-2xl bg-surface p-6 md:p-8">
              <h2 className="h4">Contact us</h2>
              <p className="mt-2 text-champion/80">
                If you have any questions or suggestions about our {docName}, do not hesitate to contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-impact underline underline-offset-2">{SITE.email}</a>.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5">Get in touch</Link>
            </section>
          </article>
        </Container>
      </Section>
    </>
  );
}
