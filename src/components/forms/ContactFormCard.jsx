"use client";

import { useState } from "react";
import LeadForm from "./LeadForm";

/** White form card used in the contact hero. The intro copy disappears once the message is sent. */
export default function ContactFormCard() {
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-lift md:p-9">
      {!sent && (
        <>
          <h2 className="h3">Send us a message</h2>
          <p className="mb-6 mt-1 text-sm text-mute">All fields are required unless marked optional.</p>
        </>
      )}
      <LeadForm showService messageRequired messageRows={3} submitLabel="Send message" onSuccess={() => setSent(true)} />
    </div>
  );
}
