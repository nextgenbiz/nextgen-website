import { NextResponse } from "next/server";

// Forwards every website lead (contact form, modal, CTA bands, chatbot) to the LMS.
// Contract is unchanged from the previous site:
//   POST { name, phone, email, state, platform, ad_name, campaign_name, ... }
//   -> LMS_API_URL with the x-api-key header set to LMS_INTERNAL_SECRET.
//
// reCAPTCHA: the previous site had server-side verification commented out, so it is not
// enforced here either. To switch it on, verify `recaptchaToken` against
// https://www.google.com/recaptcha/api/siteverify using RECAPTCHA_SECRET_KEY.

export const runtime = "nodejs";

const text = (v, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function buildLmsPayload(body, { autoSave }) {
  return {
    name: text(body.name, 120),
    phone: text(body.phone, 20),
    email: text(body.email, 160),
    state: text(body.state, 80),
    platform: text(body.platform, 60) || "website chatbot",
    ad_name: text(body.ad_name, 200),
    external_lead_id: text(body.external_lead_id, 120),
    sector: text(body.sector, 120),
    entity_type: text(body.entityType, 120),
    is_dpiit: Boolean(body.isDpiit),
    is_female_founder: Boolean(body.isFemaleFounder),
    campaign_name: text(body.campaign_name, 120) || (autoSave ? "50% Interested" : "Fully Interested"),
    // Same as the previous site: only an explicit isAutoSave request can be "incomplete".
    // Everything else (including chatbot partial saves) was always sent as completed: true.
    completed: autoSave ? Boolean(body.completed) : true,
    timestamp: text(body.timestamp, 40) || new Date().toISOString(),
  };
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const autoSave = Boolean(body?.isAutoSave);
  const payload = buildLmsPayload(body || {}, { autoSave });

  // Minimal server-side validation: a lead needs a plausible phone number. (The name is not
  // required because the chatbot saves partial progress once a phone number is captured.)
  const digits = payload.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return NextResponse.json({ success: false, error: "Please provide a valid phone number." }, { status: 400 });
  }

  if (!process.env.LMS_API_URL) {
    console.error("LMS_API_URL is not configured");
    return NextResponse.json({ success: false, error: "Service temporarily unavailable." }, { status: 503 });
  }

  try {
    const response = await fetch(process.env.LMS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LMS_INTERNAL_SECRET || "",
      },
      body: JSON.stringify(payload),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {
      /* LMS returned a non-JSON body */
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Website -> LMS error:", error?.message);
    // Auto-saves (partial chatbot progress) must never block the visitor.
    if (autoSave) {
      return NextResponse.json({ success: true, message: "Received (LMS unavailable)" }, { status: 200 });
    }
    return NextResponse.json({ success: false, error: "Connection failed. Please try again." }, { status: 502 });
  }
}
