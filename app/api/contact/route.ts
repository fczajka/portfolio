import { validateFormFields } from "@/helpers/validation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import type { ContactPayload } from "@/types";
import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 16_384;
const RESEND_TIMEOUT_MS = 8000;

function normalizeField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeHeaderText(value: string): string {
  return value.replaceAll(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request payload is too large." },
      { status: 413 },
    );
  }

  let body: Partial<ContactPayload>;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request payload is too large." },
        { status: 413 },
      );
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 },
      );
    }
    body = parsed as Partial<ContactPayload>;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const senderName = normalizeField(body.senderName);
  const email = normalizeField(body.email);
  const message = normalizeField(body.message);
  const honeypot = normalizeField(body.company);

  // Drop bot submissions that fill the hidden honeypot field silently.
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors = validateFormFields({
    name: senderName,
    mail: email,
    message,
  });

  if (Object.keys(errors).length > 0) {
    const firstError =
      errors.senderName ??
      errors.email ??
      errors.message ??
      "Invalid form data.";
    return NextResponse.json({ error: firstError, errors }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() ?? "";

  if (!resendApiKey || !fromEmail || !toEmail) {
    console.error(
      "Contact API is missing Resend server environment variables.",
    );
    return NextResponse.json(
      { error: "Contact service is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const safeName = sanitizeHeaderText(senderName);
    const htmlMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const emailResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-contact/1.0",
      },
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio message from ${safeName}`,
        text: `Name: ${senderName}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(senderName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${htmlMessage}</p>`,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text().catch(() => "");
      console.error(
        `Resend upstream error: ${emailResponse.status} ${emailResponse.statusText} ${errorBody}`.trim(),
      );
      return NextResponse.json(
        { error: "Message was not sent!" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const isTimeout =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("Failed to dispatch contact request:", error);
    return NextResponse.json(
      {
        error: isTimeout
          ? "Contact request timed out. Please try again."
          : "Message was not sent!",
      },
      { status: isTimeout ? 504 : 502 },
    );
  }
}
