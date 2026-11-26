import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Guideline: never smaller than 120px wide on screen; keep proportions; use the
// white version on dark / Impact Blue backgrounds.
export default function Logo({ variant = "color", className, priority = false, linked = true, width = 150 }) {
  const src = variant === "white" ? "/brand/logo-white.png" : variant === "champion" ? "/brand/logo-champion.png" : "/brand/logo.png";
  const img = (
    <Image
      src={src}
      alt="Nextgen Group of Companies"
      width={1800}
      height={523}
      priority={priority}
      sizes={`${width}px`}
      style={{ width, height: "auto" }}
      className={cn("select-none", className)}
    />
  );
  if (!linked) return img;
  return (
    <Link href="/" aria-label="Nextgen home" className="inline-block">
      {img}
    </Link>
  );
}
