import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import CtaBand from "@/components/home/CtaBand";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { getAllBlogs, readingMinutes } from "@/lib/blog";
import { SITE } from "@/lib/site";

const image = `${SITE.url}/brand/og-image.png`;

export const metadata = {
  title: "Business Insights & Startup Blogs | NextGen Consultancy",
  description:
    "Read expert blogs on startups, MSME growth, funding, compliance, and business strategy by NextGen Business Consultancy.",
  alternates: { canonical: `${SITE.url}/blog` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Business Insights & Startup Blogs | NextGen Consultancy",
    description: "Startup guides, funding insights, and business growth strategies.",
    url: `${SITE.url}/blog`,
    siteName: "NextGen Business Consultancy",
    locale: "en_IN",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, alt: "NextGen Business Consultancy - Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup & Business Blogs | NextGen Consultancy",
    description: "Expert-written blogs on startups, funding, and business compliance.",
    images: [image],
    creator: SITE.twitter,
  },
};

function Meta({ blog }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mute">
      <span className="font-semibold text-impact">{blog.category}</span>
      <span aria-hidden="true">·</span>
      <span>{blog.date}</span>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{readingMinutes(blog)} min read</span>
    </p>
  );
}

export default function BlogIndex() {
  const blogs = getAllBlogs();
  const [featured, ...rest] = blogs;

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE.url}/blog#blog`,
    name: "Business Insights & Startup Blogs | NextGen Consultancy",
    description: metadata.description,
    url: `${SITE.url}/blog`,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/brand/logo.png` } },
    blogPost: blogs.map((b) => ({
      "@type": "BlogPosting",
      headline: b.title.trim(),
      description: b.description,
      url: `${SITE.url}/blog/${b.slug}`,
      datePublished: b.publishedDate,
      dateModified: b.modifiedDate || b.publishedDate,
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE.url}/` },
          { name: "Blog", url: `${SITE.url}/blog` },
        ])}
      />
      <JsonLd data={blogLd} />

      <PageHero
        eyebrow="Insights"
        title={
          <>
            Business insights
            <br />
            <span className="text-heaven">for founders.</span>
          </>
        }
        lead="Expert-written guides on startups, MSME growth, funding, compliance and business strategy."
        crumbs={[{ label: "Blog" }]}
      />

      <Section>
        <Container>
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group grid gap-6 overflow-hidden rounded-3xl border border-line bg-white md:grid-cols-2">
              <div className="relative aspect-[1280/650] bg-surface md:aspect-auto md:min-h-[20rem]">
                <Image src={featured.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-left transition duration-500 group-hover:scale-105" priority />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <Meta blog={featured} />
                <h2 className="h2 mt-4 group-hover:text-impact">{featured.title.trim()}</h2>
                <p className="mt-4 line-clamp-4 text-champion/80">{featured.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-impact">
                  Read article <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((b) => (
                <li key={b.slug}>
                  <Link href={`/blog/${b.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift">
                    <div className="relative aspect-[1280/650] bg-surface">
                      <Image src={b.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-left transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <Meta blog={b} />
                      <h3 className="h4 mt-3 group-hover:text-impact">{b.title.trim()}</h3>
                      <p className="mt-2 line-clamp-3 text-[15px] text-champion/75">{b.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaBand context="Blog" />
    </>
  );
}
