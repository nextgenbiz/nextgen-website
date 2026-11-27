import Link from "next/link";
import { Mail, MapPin, Phone } from "@/components/ui/icons";
import Logo from "@/components/ui/Logo";
import { MotifMark } from "@/components/ui/Motif";
import { FOOTER_NOTICE, NAV, OFFICES, SITE } from "@/lib/site";
import { WHY_US } from "@/data/content";
import { SERVICES } from "@/data/services";

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-heaven hover:bg-heaven hover:text-champion"
    >
      {children}
    </a>
  );
}

const icon = "h-[18px] w-[18px]";

export default function Footer() {
  const year = new Date().getFullYear();
  const head = OFFICES[0];
  const popular = SERVICES.filter((s) =>
    ["private-limited-company", "startup-india-certificate", "gst-certificate", "udyam-certificate-msme", "mudra-loan", "pmegp"].includes(s.slug)
  );

  return (
    <footer className="on-dark bg-champion text-white/75">
      {/* principles strip */}
      <div className="border-b border-white/10">
        <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-sm font-semibold text-white md:justify-between">
          {WHY_US.map((t) => (
            <span key={t} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-heaven" />
              {t}
            </span>
          ))}
          <MotifMark tone="dark" className="hidden md:block" />
        </div>
      </div>

      <div className="container grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Logo variant="white" width={190} />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed">
            Aapke paas vision hai, hum handle karenge chaos. Let&apos;s get to work together.
          </p>
          <p className="eyebrow mb-3 mt-8">Follow us</p>
          <div className="flex gap-3">
            <Social href={SITE.socials.linkedin} label="LinkedIn">
              <svg className={icon} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </Social>
            <Social href={SITE.socials.facebook} label="Facebook">
              <svg className={icon} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </Social>
            <Social href={SITE.socials.instagram} label="Instagram">
              <svg className={icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
            </Social>
            <Social href={SITE.socials.youtube} label="YouTube">
              <svg className={icon} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </Social>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-[1fr_1.2fr_1.4fr]">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">Company</h2>
            <ul className="space-y-2.5 text-[15px]">
              {NAV.filter((n) => n.href !== "/").map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
              ))}
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-condition" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">Popular services</h2>
            <ul className="space-y-2.5 text-[15px]">
              {popular.map((s) => (
                <li key={s.slug}><Link href={`/service/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
              ))}
              <li><Link href="/solution" className="font-semibold text-heaven hover:text-white">All solutions →</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact</h2>
            <ul className="space-y-3.5 text-[15px]">
              <li data-icon-trigger className="flex gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-heaven" aria-hidden="true" />
                <address className="not-italic leading-relaxed">{head.address}</address>
              </li>
              <li data-icon-trigger className="flex gap-3">
                <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-heaven" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="[overflow-wrap:anywhere] hover:text-white">{SITE.email}</a>
              </li>
              <li data-icon-trigger className="flex gap-3">
                <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-heaven" aria-hidden="true" />
                <a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container space-y-3 py-8 text-xs leading-relaxed text-white/60">
          <p>{FOOTER_NOTICE.payments}</p>
          <p>{FOOTER_NOTICE.disclaimer}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 pb-24 text-xs text-white/60 sm:flex-row sm:pb-5">
          <p>© {year} Next-Gen Business Consultancy Pvt. Ltd. All rights reserved.</p>
          <p className="uppercase tracking-[0.14em]">Nextgen Group of Companies</p>
        </div>
      </div>
    </footer>
  );
}
