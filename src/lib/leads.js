"use client";

// Shared client helpers for every lead form on the site. All forms post to
// /api/contact, which forwards to the LMS (same contract as the previous site).

const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const FALLBACK_EMAIL = "subscriber@nextgenbusiness.co.in";

export const normalizePhone = (value = "") => value.replace(/[\s\-().+]/g, "");

export function validateLead(values, { require = ["name", "phone"] } = {}) {
  const errors = {};
  const name = (values.name || "").trim();
  const phone = normalizePhone(values.phone || "");

  if (require.includes("name") && !name) errors.name = "Please enter your name";
  if (require.includes("phone")) {
    if (!phone) errors.phone = "Please enter your mobile number";
    else if (!/^[0-9]{10,15}$/.test(phone)) errors.phone = "Enter a valid number (10 to 15 digits)";
  }
  if (require.includes("email")) {
    if (!values.email?.trim()) errors.email = "Please enter your email";
    else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address";
  }
  if (require.includes("state") && !values.state) errors.state = "Please select your state";
  if (require.includes("service") && !values.service) errors.service = "Please select a service";
  if (require.includes("message") && !values.message?.trim()) errors.message = "Please add a short message";
  return errors;
}

async function getRecaptchaToken(action) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha) return "";
  try {
    return await new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => window.grecaptcha.execute(siteKey, { action }).then(resolve, reject));
    });
  } catch {
    return "";
  }
}

/**
 * Sends a lead. Returns { ok: true } or { ok: false, message }.
 * `context` is what the visitor was interested in (service name or page); it is sent
 * as `ad_name`, which is the field the LMS records for lead source.
 */
export async function submitLead(values, { context = "", action = "contact_form" } = {}) {
  const name = (values.name || "").trim();
  const phone = normalizePhone(values.phone || "");
  const service = values.service || context || "";

  const payload = {
    name,
    phone,
    email: values.email?.trim() || FALLBACK_EMAIL,
    state: values.state || "",
    city: values.city || "",
    message: [values.message?.trim(), service && `Service Type : ${service}`].filter(Boolean).join(", "),
    domain: process.env.NEXT_PUBLIC_DOMAIN || "nextgenbusiness.co.in",
    platform: "website",
    campaign_name: "Fully Interested",
    ad_name: service,
    completed: true,
  };

  const recaptchaToken = await getRecaptchaToken(action);
  if (recaptchaToken) payload.recaptchaToken = recaptchaToken;

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let data = {};
    try {
      data = await res.json();
    } catch {
      /* non-JSON response */
    }
    if (!res.ok) {
      return { ok: false, message: data?.error || data?.message || "Something went wrong. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "We couldn't reach the server. Please check your connection and try again." };
  }
}
