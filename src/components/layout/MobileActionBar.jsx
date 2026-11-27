"use client";

import { useEffect, useState } from "react";
import { MessageSquareText, Phone } from "@/components/ui/icons";
import { useContactModal } from "@/components/forms/ContactModalProvider";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Phones only: a pinned Call / Free-consultation bar so the two main actions are always one tap
 * away. It appears after the first screen so it never competes with the hero.
 * Targets are 48px tall with an 8px gap (skill UX rules: 44-48px targets, 8px spacing).
 */
export default function MobileActionBar() {
  const { open } = useContactModal();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!show}
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <a
          href={SITE.phoneHref}
          tabIndex={show ? 0 : -1}
          className="btn btn-outline h-12 !px-5"
          aria-label={`Call ${SITE.phone}`}
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <button type="button" tabIndex={show ? 0 : -1} onClick={() => open("")} className="btn btn-primary h-12">
          <MessageSquareText className="h-4 w-4" /> Free consultation
        </button>
      </div>
    </div>
  );
}
