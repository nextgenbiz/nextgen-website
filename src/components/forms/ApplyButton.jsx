"use client";

import { useContactModal } from "./ContactModalProvider";
import { cn } from "@/lib/utils";

/** Button that opens the enquiry modal, optionally for a specific service. */
export default function ApplyButton({ service = "", className = "btn btn-primary", children = "Book a free consultation" }) {
  const { open } = useContactModal();
  return (
    <button type="button" onClick={() => open(service)} className={cn(className)}>
      {children}
    </button>
  );
}
