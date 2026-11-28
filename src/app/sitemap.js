import { SERVICES } from "@/data/services";
import { getAllBlogs } from "@/lib/blog";
import { EVENTS } from "@/data/events";
import { SITE } from "@/lib/site";

export default function sitemap() {
  const lastModified = new Date().toISOString();
  const page = (path, changeFrequency, priority) => ({ url: `${SITE.url}${path}`, lastModified, changeFrequency, priority });

  return [
    page("/", "weekly", 1.0),
    page("/about", "monthly", 0.8),
    page("/solution", "weekly", 0.9),
    page("/digital-sahaay", "monthly", 0.8),
    page("/contact", "monthly", 0.7),
    page("/blog", "weekly", 0.8),
    page("/privacy-policy", "yearly", 0.3),
    page("/terms-condition", "yearly", 0.3),
    ...SERVICES.map((s) => page(`/service/${s.slug}`, "monthly", 0.8)),
    // Blog posts report their real modified date, so crawlers can tell what actually changed.
    ...getAllBlogs().map((b) => ({
      ...page(`/blog/${b.slug}`, "monthly", 0.7),
      lastModified: new Date(`${b.modifiedDate || b.publishedDate}T00:00:00+05:30`).toISOString(),
    })),
    ...EVENTS.map((e) => page(`/about/events/${e.slug}`, "yearly", 0.6)),
  ];
}
