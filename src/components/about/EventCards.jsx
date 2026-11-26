import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EVENTS, getCover } from "@/data/events";

/** Grid of celebration / event cards (used on About and the events index). */
export default async function EventCards({ limit }) {
  const events = limit ? EVENTS.slice(0, limit) : EVENTS;
  const covers = await Promise.all(events.map((e) => getCover(e)));

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e, i) => (
        <li key={e.slug}>
          <Link href={`/about/events/${e.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              {covers[i] && (
                <Image
                  src={covers[i].src}
                  alt={`${e.title} at Nextgen`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-champion">{e.category}</span>
              <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-impact text-white opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            <h3 className="mt-4 text-h4 font-semibold text-champion group-hover:text-impact">
              {e.title} <span className="font-medium text-mute">· {e.subtitle}</span>
            </h3>
            <p className="mt-1 text-sm text-mute">{e.date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
