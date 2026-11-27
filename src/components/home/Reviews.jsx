"use client";

import { useState } from "react";
import useAutoScroll from "@/lib/useAutoScroll";
import { ChevronLeft, ChevronRight, Star } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/Section";
import { REVIEWS } from "@/data/reviews";
import { cn } from "@/lib/utils";

function GoogleG({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.3 5.7c4.3-4 6.9-9.9 6.9-17z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.7 2.3-8.6 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 220;
  return (
    <figure className="card flex h-full w-[84vw] max-w-[24rem] shrink-0 flex-col p-6 md:w-[24rem] md:p-7">
      <div className="flex items-center justify-between">
        <div data-icon-trigger className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#F5B301] text-[#F5B301]" aria-hidden="true" />
          ))}
        </div>
        <GoogleG className="h-5 w-5" />
      </div>
      <blockquote className="mt-4 flex-1">
        <p className={cn("text-[15px] leading-relaxed text-champion/85", !expanded && long && "line-clamp-6")}>
          &ldquo;{review.text}&rdquo;
        </p>
        {long && (
          <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-2 text-sm font-semibold text-impact hover:underline">
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-impact text-sm font-bold text-white" aria-hidden="true">
          {review.name.trim().charAt(0)}
        </span>
        <span>
          <span className="block text-[15px] font-semibold text-champion">{review.name}</span>
          <span className="block text-xs text-mute">Google review</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const { ref, loopRef, nudge } = useAutoScroll({ speed: 38 });
  const scrollBy = (dir) => nudge(dir, 400);

  return (
    <Section tone="surface" id="reviews">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Testimonials</p>
            <h2 className="h2">What our clients say.</h2>
            <p className="lead mt-4">
              Discover how our clients describe their experience with us. Their trust and satisfaction inspire everything we do.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="mr-2 hidden items-center gap-2 text-sm font-semibold text-champion sm:flex">
              <GoogleG className="h-5 w-5" /> 4.9 on Google
            </div>
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous reviews" className="grid h-11 w-11 place-items-center rounded-full border border-champion/20 text-champion transition hover:bg-champion hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Next reviews" className="grid h-11 w-11 place-items-center rounded-full border border-champion/20 text-champion transition hover:bg-champion hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* endless auto-scroll: three identical copies, only the first is exposed to assistive tech and the keyboard */}
      <div
        ref={ref}
        role="region"
        aria-label="Client reviews"
        className="scrollbar-none edge-pad mt-10 flex overflow-x-auto pb-2"
      >
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            ref={copy === 0 ? loopRef : undefined}
            inert={copy > 0}
            aria-hidden={copy > 0 ? "true" : undefined}
            className="flex shrink-0 gap-4 pr-4 md:gap-5 md:pr-5"
          >
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
