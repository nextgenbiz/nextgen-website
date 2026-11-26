import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Team celebrations and activities. Galleries are read from /public/assets/<folder>
// at build time, so adding photos to a folder is all that's needed.
export const EVENTS = [
  {
    slug: "ganesh-chaturthi-celebrations",
    folder: "ganesh",
    title: "Ganesh Chaturthi",
    subtitle: "Celebrations at Nextgen",
    category: "Festival",
    date: "September 27, 2025",
  },
  {
    slug: "diwali-celebrations",
    folder: "diwali",
    title: "Diwali",
    subtitle: "Celebrations at Nextgen",
    category: "Festival",
    date: "October 20, 2025",
  },
  {
    slug: "events-activities",
    folder: "activites",
    title: "Events & Activities",
    subtitle: "Fun at Nextgen",
    category: "Events",
    date: "November 29, 2025",
  },
  {
    slug: "pongal-celebrations",
    folder: "pongal",
    title: "Pongal",
    subtitle: "Harvest Festival at Nextgen",
    category: "Festival",
    date: "January 14, 2026",
  },
  {
    slug: "cricket-tournament",
    folder: "cricket",
    title: "Cricket Tournament",
    subtitle: "Team Spirit at Nextgen",
    category: "Sports",
    date: "January 2026",
  },
  {
    slug: "holi-celebrations",
    folder: "holi",
    title: "Holi",
    subtitle: "Festival of Colours at Nextgen",
    category: "Festival",
    date: "March 14, 2026",
  },
];

export function getEvent(slug) {
  return EVENTS.find((e) => e.slug === slug);
}

/** Returns [{ src, width, height }] for every image in the event folder, in numeric order. */
export async function getGallery(folder) {
  const dir = path.join(process.cwd(), "public", "assets", folder);
  let files = [];
  try {
    files = (await fs.readdir(dir))
      .filter((f) => /\.(webp|jpe?g|png)$/i.test(f))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  } catch {
    return [];
  }
  return Promise.all(
    files.map(async (f) => {
      const { width, height } = await sharp(path.join(dir, f)).metadata();
      return { src: `/assets/${folder}/${f}`, width, height };
    })
  );
}

export async function getCover(event) {
  const g = await getGallery(event.folder);
  return g[0] ?? null;
}
