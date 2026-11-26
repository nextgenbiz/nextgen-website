"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import LeadForm from "./LeadForm";
import { MotifMark } from "@/components/ui/Motif";

/** Modal enquiry form. Same props as the old component: onClose, selectedService. */
export default function ContactUs({ onClose, selectedService }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // move focus into the dialog
    const t = setTimeout(() => panelRef.current?.querySelector("input")?.focus(), 50);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-champion/70 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white shadow-lift sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white px-6 pb-4 pt-6 sm:px-8">
          <div>
            <MotifMark className="mb-3" />
            <h2 id="contact-modal-title" className="h3">
              {selectedService ? `Apply for ${selectedService}` : "Book a free consultation"}
            </h2>
            <p className="mt-1 text-sm text-mute">Share your details and our team will call you back.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-champion transition hover:bg-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 pb-8 pt-6 sm:px-8">
          <LeadForm service={selectedService || "Free Consultation Booking"} submitLabel="Submit application" />
        </div>
      </div>
    </div>
  );
}
