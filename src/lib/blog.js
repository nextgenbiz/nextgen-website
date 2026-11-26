import { getAllBlogs, getBlogBySlug } from "@/data/blogData";

export { getAllBlogs, getBlogBySlug };

/** Sections in display order: [{ id, title, paragraphs, listItems }] */
export function getSections(blog) {
  return Object.entries(blog.content || {}).map(([key, s]) => {
    const title = (s.title || "").trim();
    return {
      key,
      title,
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || key,
      paragraphs: s.paragraphs || [],
      listItems: s.listItems || [],
    };
  });
}

/** Computed from the text; the source data's readingTime field is not reliable. */
export function readingMinutes(blog) {
  const text = getSections(blog)
    .flatMap((s) => [s.title, ...s.paragraphs, ...s.listItems])
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Source list items are written as "Label -detail ,detail" strings. Split them into a
 * label and tidy body where that pattern is present; otherwise return the text untouched.
 */
export function formatListItem(item = "") {
  const m = item.match(/^(.{3,140}?)\s+-\s*(\S.*)$/);
  if (!m) return { label: null, body: item.trim() };
  const body = m[2].replace(/\s+,/g, ",").replace(/,(?=[A-Za-z])/g, ", ").trim();
  return { label: m[1].trim(), body };
}
