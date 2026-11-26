"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead, validateLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

/** Two-field form (name + mobile) for the "book a free session" bands. */
export default function QuickForm({ context = "Free consultation (website)", className }) {
  const uid = useId();
  const [values, setValues] = useState({ name: "", phone: "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, done: false, error: "" });

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (values.website) return setStatus({ loading: false, done: true, error: "" });
    const found = validateLead(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setStatus({ loading: true, done: false, error: "" });
    const res = await submitLead(values, { context, action: "cta_form" });
    setStatus(res.ok ? { loading: false, done: true, error: "" } : { loading: false, done: false, error: res.message });
  }

  if (status.done) {
    return (
      <div role="status" className="flex items-center gap-3 rounded-2xl bg-white/10 p-5 text-white">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-heaven" />
        <p className="font-medium">Thank you! We will contact you shortly.</p>
      </div>
    );
  }

  const fieldCls = (k) =>
    cn(
      "w-full rounded-xl border-2 border-transparent bg-white px-5 py-4 text-[15px] text-champion placeholder:text-mute/70 focus:border-heaven focus:outline-none",
      errors[k] && "border-red-400"
    );

  return (
    <form onSubmit={onSubmit} noValidate className={cn("space-y-3", className)}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-n`} className="sr-only">Full name</label>
          <input id={`${uid}-n`} type="text" autoComplete="name" placeholder="Full name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} className={fieldCls("name")} />
          {errors.name && <p role="alert" className="mt-1.5 text-xs font-medium text-red-200">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-p`} className="sr-only">Mobile number</label>
          <input id={`${uid}-p`} type="tel" inputMode="tel" autoComplete="tel" placeholder="Mobile number" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} className={fieldCls("phone")} />
          {errors.phone && <p role="alert" className="mt-1.5 text-xs font-medium text-red-200">{errors.phone}</p>}
        </div>
      </div>
      {status.error && <p role="alert" className="rounded-lg bg-red-500/90 px-4 py-2.5 text-sm font-medium text-white">{status.error}</p>}
      <button type="submit" disabled={status.loading} className="btn btn-dark btn-lg w-full">
        {status.loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>) : (<>Book now <ArrowRight className="h-4 w-4" /></>)}
      </button>
    </form>
  );
}
