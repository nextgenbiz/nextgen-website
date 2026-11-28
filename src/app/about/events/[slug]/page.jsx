import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/ui/icons";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Gallery from "@/components/about/Gallery";
import { EVENTS, getEvent, getGallery } from "@/data/events";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return { title: "Event not found | NextGen Business Consultancy" };
  const url = `${SITE.url}/about/events/${slug}`;
  const title = `${e.title} ${e.subtitle} | NextGen Business Consultancy`;
  const description = `Photos from ${e.title} at NextGen Business Consultancy, ${e.date}.`;
  const image = `${SITE.url}/brand/og-image.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    // Without this the page inherits the homepage's og:url / og:title from the root layout.
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${e.title} at NextGen` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image], creator: SITE.twitter },
  };
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const images = await getGallery(event.folder);
  const others = EVENTS.filter((e) => e.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={`${event.category} · ${event.date}`}
        title={
          <>
            {event.title}
            <span className="block text-impact">{event.subtitle}</span>
          </>
        }
        crumbs={[{ label: "Our Story", href: "/about" }, { label: "Events", href: "/about/events" }, { label: event.title }]}
        imageAlt={`${event.title} celebrations at NextGen`}
      />
      <Section>
        <Container>
          {images.length ? (
            <Gallery images={images} title={`${event.title} at Nextgen`} />
          ) : (
            <p className="text-mute">Photos coming soon.</p>
          )}

          <div className="mt-16 border-t border-line pt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="h3">More from Nextgen</h2>
              <Link href="/about/events" className="inline-flex items-center gap-2 text-sm font-semibold text-impact hover:underline">
                <ArrowLeft className="h-4 w-4" /> All events
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-3">
              {others.map((e) => (
                <li key={e.slug}>
                  <Link href={`/about/events/${e.slug}`} className="inline-block rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-champion transition hover:border-impact hover:text-impact">
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
