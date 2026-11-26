import { cn } from "@/lib/utils";

export function Container({ className, children, as: Tag = "div" }) {
  return <Tag className={cn("container", className)}>{children}</Tag>;
}

/**
 * tone: "white" | "surface" | "dark" (Champion Blue) | "brand" (Impact Blue)
 * Dark and brand sections set .on-dark so headings, eyebrows and leads invert.
 */
export function Section({ tone = "white", className, children, id, ...rest }) {
  const tones = {
    white: "bg-white",
    surface: "bg-surface",
    dark: "bg-champion on-dark",
    brand: "bg-impact on-dark",
  };
  return (
    <section id={id} className={cn("section", tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead, align = "left", className, as: Tag = "h2", children }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className="h2">{title}</Tag>
      {lead && <p className="lead mt-4">{lead}</p>}
      {children}
    </div>
  );
}
