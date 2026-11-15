import { validateFormFields } from "@/helpers/validation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import type { ContactPayload } from "@/types";
import { NextResponse } from "next/server";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const MAX_BODY_BYTES = 16_384;
const EMAILJS_TIMEOUT_MS = 8000;

function normalizeField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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

  const serviceId =
    process.env.EMAILJS_SERVICE_ID ?? process.env.SERVICE_ID ?? "";
  const templateId =
    process.env.EMAILJS_TEMPLATE_ID ?? process.env.TEMPLATE_ID ?? "";
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY ?? process.env.PUBLIC_KEY ?? "";
  const privateKey = process.env.EMAILJS_PRIVATE_KEY ?? "";

  if (!serviceId || !templateId || !publicKey) {
    console.error(
      "Contact API is missing EmailJS server environment variables.",
    );
    return NextResponse.json(
      { error: "Contact service is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const emailResponse = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(EMAILJS_TIMEOUT_MS),
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: {
          senderName,
          email,
          message,
        },
      }),
    });

    if (!emailResponse.ok) {
      console.error(
        `EmailJS upstream error: ${emailResponse.status} ${emailResponse.statusText}`,
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
