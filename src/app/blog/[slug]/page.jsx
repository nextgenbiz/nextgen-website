import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "@/components/ui/icons";
import PageHero from "@/components/ui/PageHero";
import PageToc from "@/components/ui/PageToc";
import { Container, Section } from "@/components/ui/Section";
import ApplyButton from "@/components/forms/ApplyButton";
import CtaBand from "@/components/home/CtaBand";
import JsonLd, { breadcrumbLd } from "@/components/seo/JsonLd";
import { formatListItem, getAllBlogs, getBlogBySlug, getSections, readingMinutes } from "@/lib/blog";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Blog Not Found | NextGen Business Consultancy" };

  const url = `${SITE.url}/blog/${slug}`;
  const image = `${SITE.url}${blog.image}`;
  const published = blog.publishedDate ? `${blog.publishedDate}T00:00:00+05:30` : undefined;
  const modified = blog.modifiedDate ? `${blog.modifiedDate}T00:00:00+05:30` : published;
  const title = blog.title.trim();

  return {
    title: `${title} | NextGen Business Consultancy`,
    description: blog.description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    authors: blog.author ? [{ name: blog.author.name, url: blog.author.url }] : undefined,
    openGraph: {
      title,
      description: blog.description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "article",
      publishedTime: published,
      modifiedTime: modified,
      authors: blog.author ? [blog.author.name] : undefined,
      section: blog.category,
      tags: blog.tags,
      images: [{ url: image, width: 1280, height: 650, alt: `${title} – NextGen Business Consultancy` }],
    },
    twitter: { card: "summary_large_image", title, description: blog.description, images: [image], creator: SITE.twitter },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const url = `${SITE.url}/blog/${slug}`;
  const title = blog.title.trim();
  const sections = getSections(blog);
  const toc = sections.map((s) => ({ id: s.id, label: s.title }));
  const published = blog.publishedDate ? `${blog.publishedDate}T00:00:00+05:30` : undefined;
  const modified = blog.modifiedDate ? `${blog.modifiedDate}T00:00:00+05:30` : published;
  const related = getAllBlogs().filter((b) => b.slug !== slug).slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: title,
    description: blog.description,
    image: `${SITE.url}${blog.image}`,
    datePublished: published,
    dateModified: modified,
    author: { "@type": "Organization", name: blog.author?.name || SITE.name, url: blog.author?.url || SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/brand/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: blog.category,
    keywords: blog.tags?.join(", "),
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE.url}/` },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: title, url },
        ])}
      />

      <PageHero
        eyebrow={blog.category}
        title={title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: title }]}
        image={blog.image}
        imageAlt={title}
      >
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mute">
          <span>{blog.author?.name}</span>
          <span aria-hidden="true">·</span>
          <span>{blog.date}</span>
          <span aria-hidden="true">·</span>
          <span data-icon-trigger className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{readingMinutes(blog)} min read</span>
        </p>
      </PageHero>

      <Section>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:hidden">
            <PageToc items={toc} orientation="horizontal" />
          </div>
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 space-y-8">
              <div>
                <p className="eyebrow mb-3">In this article</p>
                <PageToc items={toc} />
              </div>
              <div className="on-dark rounded-2xl bg-champion p-6">
                <h2 className="text-h4 font-semibold text-white">Need help applying?</h2>
                <p className="mt-2 text-[15px] text-white/70">Our experts can guide you end to end.</p>
                <ApplyButton service={`Blog: ${title}`} className="btn btn-light mt-5 w-full">Talk to an expert</ApplyButton>
              </div>
            </div>
          </aside>

          <article className="max-w-3xl space-y-12 lg:col-span-9">
            {sections.map((s) => (
              <section key={s.key} id={s.id} className="scroll-mt-28">
                <h2 className="h3 mb-4">{s.title}</h2>
                <div className="space-y-4 text-[17px] leading-[1.75] text-champion/85">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {s.listItems.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {s.listItems.map((item, i) => {
                      const { label, body } = formatListItem(item);
                      return (
                        <li key={i} className="flex gap-3.5 rounded-xl border border-line bg-surface px-5 py-4 text-base leading-relaxed text-champion/90">
                          <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-impact" />
                          <span>
                            {label && <strong className="block font-semibold text-champion">{label}</strong>}
                            {body}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            ))}

            {blog.tags?.length > 0 && (
              <ul className="flex flex-wrap gap-2 border-t border-line pt-8">
                {blog.tags.map((t) => (
                  <li key={t} className="rounded-full bg-impact-50 px-3.5 py-1.5 text-sm font-semibold text-impact">{t}</li>
                ))}
              </ul>
            )}
          </article>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="surface">
          <Container>
            <h2 className="h3 mb-8">Keep reading</h2>
            <ul className="grid gap-5 md:grid-cols-3">
              {related.map((b) => (
                <li key={b.slug}>
                  <Link href={`/blog/${b.slug}`} className="card group flex h-full flex-col p-6 transition hover:border-impact">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-impact">{b.category}</p>
                    <h3 className="h4 mt-3 group-hover:text-impact">{b.title.trim()}</h3>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-impact">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaBand context={`Blog: ${title}`} />
    </>
  );
}
