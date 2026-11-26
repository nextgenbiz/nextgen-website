import { Container } from "@/components/ui/Section";
import QuickForm from "@/components/forms/QuickForm";
import { MotifBackdrop } from "@/components/ui/Motif";

/** "Book a free session" band used above the footer on most pages. */
export default function CtaBand({
  title = "Unlock growth potential today.",
  lead = "Enter your details to schedule your free consultancy session. Elevate your business with professional strategies.",
  context = "Free consultation (website)",
}) {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      <Container>
        <div className="on-dark relative overflow-hidden rounded-[2rem] bg-impact px-6 py-10 md:px-12 md:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-16 hidden h-[140%] w-[26rem] opacity-25 md:block">
            <MotifBackdrop />
          </div>
          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="h2 text-white">{title}</h2>
              <p className="mt-3 max-w-md text-white/85">{lead}</p>
            </div>
            <QuickForm context={context} />
          </div>
        </div>
      </Container>
    </section>
  );
}
