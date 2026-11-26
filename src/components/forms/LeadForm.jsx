"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { INDIAN_STATES } from "@/lib/site";
import { submitLead, validateLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

export const SERVICE_OPTIONS = [
  "Loans",
  "Certifications",
  "Digital Services",
  "General Consultancy",
  "Consulting Services",
];

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Full lead form (modal + contact page).
 * props: service (prefill / context), showService (dropdown), submitLabel, onSuccess
 */
export default function LeadForm({
  service = "",
  showService = false,
  messageRequired = false,
  submitLabel = "Send enquiry",
  onSuccess,
  className,
}) {
  const uid = useId();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    service: "",
    message: service ? `I'm interested in ${service}` : "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, done: false, error: "" });

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    setStatus((s) => (s.error ? { ...s, error: "" } : s));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (values.website) {
      // Honeypot filled: behave as if it worked, send nothing.
      setStatus({ loading: false, done: true, error: "" });
      return;
    }
    const require = ["name", "phone", "email", "state"];
    if (showService) require.push("service");
    if (messageRequired) require.push("message");
    const found = validateLead(values, { require });
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus({ loading: false, done: false, error: "Please fix the highlighted fields." });
      return;
    }
    setStatus({ loading: true, done: false, error: "" });
    const res = await submitLead(values, { context: service, action: "contact_form" });
    if (!res.ok) {
      setStatus({ loading: false, done: false, error: res.message });
      return;
    }
    setStatus({ loading: false, done: true, error: "" });
    onSuccess?.();
  }

  if (status.done) {
    return (
      <div className={cn("py-10 text-center", className)} role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-impact-50 text-impact">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="h3 mt-5">Thank you, we&apos;ve got it.</h3>
        <p className="mx-auto mt-2 max-w-sm text-champion/80">
          Our team will contact you shortly on the number you shared.
        </p>
      </div>
    );
  }

  const inputProps = (key) => ({
    id: `${uid}-${key}`,
    value: values[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-err` : undefined,
    className: cn("field", errors[key] && "field-error"),
  });

  return (
    <form onSubmit={onSubmit} noValidate className={cn("space-y-4", className)}>
      {/* Honeypot: hidden from people, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Full name" error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Your full name" {...inputProps("name")} />
        </Field>
        <Field id={`${uid}-phone`} label="Mobile number" error={errors.phone}>
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" {...inputProps("phone")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-email`} label="Email address" error={errors.email}>
          <input type="email" autoComplete="email" placeholder="you@company.com" {...inputProps("email")} />
        </Field>
        <Field id={`${uid}-state`} label="State" error={errors.state}>
          <select {...inputProps("state")}>
            <option value="">Select your state</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      {showService && (
        <Field id={`${uid}-service`} label="What do you need help with?" error={errors.service}>
          <select {...inputProps("service")}>
            <option value="">Select a service type</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      )}

      <Field id={`${uid}-message`} label={messageRequired ? "Message" : "Message (optional)"} error={errors.message}>
        <textarea rows={4} placeholder="Tell us a little about your business and what you need" {...inputProps("message")} />
      </Field>

      {status.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {status.error}
        </p>
      )}

      <button type="submit" disabled={status.loading} className="btn btn-primary btn-lg w-full">
        {status.loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            {submitLabel} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-mute">
        By submitting you agree to be contacted about your enquiry. See our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-impact">Privacy Policy</a>.
      </p>
    </form>
  );
}
