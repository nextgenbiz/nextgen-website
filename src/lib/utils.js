export function cn(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

export function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function absoluteUrl(path = "/") {
  const base = "https://www.nextgenbusiness.co.in";
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
