import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import EventCards from "@/components/about/EventCards";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Festival Celebrations & Events | NextGen Business Consultancy",
  description:
    "Explore festival celebrations, corporate events, and cultural moments at NextGen Business Consultancy that reflect our values, teamwork, and vibrant work culture.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/about/events` },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Life at Nextgen"
        title="Celebrations & events."
        lead="Festivals, tournaments and team moments that reflect our values, teamwork and vibrant work culture."
        crumbs={[{ label: "Our Story", href: "/about" }, { label: "Events" }]}
        imageAlt="NextGen team members celebrating a company milestone together"
      />
      <Section>
        <Container>
          <EventCards />
        </Container>
      </Section>
    </>
  );
}
