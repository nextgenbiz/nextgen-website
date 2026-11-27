// Content for the Digital Sahaay page (our digital growth arm, https://digitalsahaay.com).
// Short descriptions only; the page's job is to explain the department and send people to their site.

export const DS_URL = "https://digitalsahaay.com";

/** Link into digitalsahaay.com, tagged so they can see which visits came from this site. */
export function dsLink(path = "/", params = {}) {
  const url = new URL(path, DS_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("utm_source", "nextgenbusiness.co.in");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "digital-sahaay-page");
  return url.toString();
}

export const DS_CONTACT = {
  phone: "+91 98983 46774",
  phoneHref: "tel:+919898346774",
  whatsapp: "https://wa.me/919898346774",
  email: "info@digitalsahaay.com",
  hours: "Mon – Sat, 9:30 am – 7:00 pm",
  offices: "Ahmedabad · Pune · Chennai",
};

// icon = name of an export in components/ui/icons.js
export const DS_SERVICES = [
  { title: "Website Development", icon: "Globe2", description: "Fast, modern, high-converting websites designed for growth.", href: dsLink("/services", { category: "Website & App Development" }) },
  { title: "SEO Optimization", icon: "Search", description: "Improve rankings, increase visibility and drive organic traffic.", href: dsLink("/services", { category: "SEO Optimization" }) },
  { title: "Social Media Marketing", icon: "MessageSquareText", description: "Build brand awareness and engage your audience effectively.", href: dsLink("/services", { category: "Social Media Marketing" }) },
  { title: "Performance Marketing", icon: "TrendingUp", description: "ROI-focused advertising campaigns across Google and Meta.", href: dsLink("/services", { category: "Performance Marketing" }) },
  { title: "Branding & Design", icon: "BadgeCheck", description: "Create a powerful and memorable brand identity.", href: dsLink("/services", { category: "Branding & Design" }) },
  { title: "Content Marketing", icon: "FileText", description: "Content strategies that attract, educate and convert customers.", href: dsLink("/services") },
  { title: "Lead Generation", icon: "Rocket", description: "Generate consistent, high-quality leads for your business.", href: dsLink("/services") },
  { title: "Business Growth Consulting", icon: "BriefcaseBusiness", description: "Strategic guidance to help your business scale confidently.", href: dsLink("/services") },
];

export const DS_STEPS = [
  { title: "Understand your business", description: "A discovery session on your goals, market, competition and challenges.", peep: 102 },
  { title: "Build strategy and execute", description: "A custom plan, delivered by dedicated specialists.", peep: 11 },
  { title: "Optimize and scale", description: "Continuous, data-driven optimisation to maximise your return.", peep: 28 },
];
