import { Container, Section } from "@/components/ui/Section";
import Accordion from "@/components/ui/Accordion";
import JsonLd, { faqLd } from "@/components/seo/JsonLd";

/** FAQ with matching FAQPage schema, so the markup mirrors what's visible on the page. */
export default function FaqSection({ items, title = "Frequently asked questions.", lead, tone = "white" }) {
  return (
    <Section tone={tone}>
      <JsonLd data={faqLd(items)} />
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="h2">{title}</h2>
          {lead && <p className="lead mt-4">{lead}</p>}
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
