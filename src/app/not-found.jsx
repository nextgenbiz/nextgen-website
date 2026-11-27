import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { SERVICES } from "@/data/services";

export const metadata = {
  title: "Page not found | NextGen Business Consultancy",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const suggestions = SERVICES.filter((s) =>
    ["private-limited-company", "startup-india-certificate", "udyam-certificate-msme", "mudra-loan"].includes(s.slug)
  );
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title="That page took a wrong turn."
        lead="The page you're looking for doesn't exist or has moved. Let's get you back on track."
        aside={
          <div className="flex items-center justify-center gap-4 font-display text-[8rem] leading-none text-champion">
            <span>4</span>
            <svg viewBox="0 0 130 130" className="h-[7rem] w-[7rem]">
              <circle cx="46" cy="52" r="40" fill="#0F42C0" />
              <circle cx="84" cy="80" r="40" fill="#7A9FF9" />
            </svg>
            <span>4</span>
          </div>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary btn-lg">Back to home</Link>
          <Link href="/contact" className="btn btn-outline btn-lg">Talk to us</Link>
        </div>
      </PageHero>
      <section className="section">
        <div className="container">
          <p className="eyebrow mb-3">Popular pages</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((s) => (
              <li key={s.slug}>
                <Link href={`/service/${s.slug}`} className="card block p-5 font-semibold text-champion transition hover:border-impact hover:text-impact">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
