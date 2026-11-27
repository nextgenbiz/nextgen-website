"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/Section";
import { SHORTS } from "@/data/content";

function Short({ id, index }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-[9/16] w-[62vw] max-w-[17rem] shrink-0 snap-start overflow-hidden rounded-3xl bg-champion-800 md:w-[17rem]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title={`Nextgen video ${index + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play video ${index + 1}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
          <span className="absolute inset-0 bg-gradient-to-t from-champion/70 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-impact shadow-lift transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}

export default function Shorts() {
  const track = useRef(null);
  const scrollBy = (d) => track.current?.scrollBy({ left: d * 300, behavior: "smooth" });
  return (
    <Section>
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Watch</p>
            <h2 className="h2">Inspiring innovation through motion.</h2>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous videos" className="grid h-11 w-11 place-items-center rounded-full border border-champion/20 text-champion transition hover:bg-champion hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Next videos" className="grid h-11 w-11 place-items-center rounded-full border border-champion/20 text-champion transition hover:bg-champion hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
      <div
        ref={track}
        className="scrollbar-none edge-pad mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {SHORTS.map((id, i) => (
          <Short key={id} id={id} index={i} />
        ))}
      </div>
    </Section>
  );
}
