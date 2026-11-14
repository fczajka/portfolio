import { validateFormFields } from "@/helpers/helpers";
import type { ContactPayload } from "@/types";
import { NextResponse } from "next/server";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

function normalizeField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
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
    console.error("Failed to dispatch contact request:", error);
    return NextResponse.json(
      { error: "Message was not sent!" },
      { status: 502 },
    );
  }
}
