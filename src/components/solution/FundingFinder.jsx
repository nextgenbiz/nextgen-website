"use client";

import { Search } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/Section";
import { PopPair } from "@/components/illustrations/PeepScene";

/** Opens the UdyamMitra funding-finder chatbot (loaded globally in the layout). */
export default function FundingFinder() {
  return (
    <Section tone="surface">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-3">Funding finder</p>
          <h2 className="h2">Not sure which scheme fits your business?</h2>
          <p className="lead mt-4 max-w-xl">
            Answer a few quick questions about your sector, entity type and funding need. UdyamMitra checks the
            government schemes and funding programs that match, and shows you the best fits.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-champion/85">
            {["Checks your answers against 88 schemes and funding programs", "Covers grants, loans, seed and equity support", "An advisor can walk you through the application"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-impact" />
                {t}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("nextgen:open-chatbot"))}
            className="btn btn-primary btn-lg mt-8"
          >
            <Search className="h-4 w-4" /> Find my scheme
          </button>
        </div>
        <div className="lg:col-span-6">
          <PopPair peeps={[101, 27]} className="mx-auto" />
        </div>
      </Container>
    </Section>
  );
}
