import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

function createJsonRequest(payload: unknown): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

describe("POST /api/contact", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.SERVICE_ID = "svc_test";
    process.env.TEMPLATE_ID = "tpl_test";
    process.env.PUBLIC_KEY = "pub_test";
    delete process.env.EMAILJS_PRIVATE_KEY;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it("silently accepts and drops honeypot bot submissions", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      createJsonRequest({
        senderName: "Bot",
        email: "bot@example.com",
        message: "Buy links",
        company: "Spam LLC",
      }),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 400 with field errors for invalid submissions", async () => {
    const response = await POST(
      createJsonRequest({
        senderName: "Jane",
        email: "not-an-email",
        message: "Hello",
      }),
    );

    const data = (await response.json()) as {
      error: string;
      errors: Record<string, string>;
    };
    expect(response.status).toBe(400);
    expect(data.errors.email).toBe("Please enter a valid email address.");
  });

  it("returns 503 when server EmailJS credentials are unconfigured", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    delete process.env.SERVICE_ID;
    delete process.env.EMAILJS_SERVICE_ID;

    const response = await POST(
      createJsonRequest({
        senderName: "Jane",
        email: "jane@example.com",
        message: "Hello!",
      }),
    );

    expect(response.status).toBe(503);
  });

  it("dispatches valid payloads to the EmailJS REST endpoint", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("OK", { status: 200 }));

    const response = await POST(
      createJsonRequest({
        senderName: "Jane Doe",
        email: "jane@example.com",
        message: "Let's build something!",
      }),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.emailjs.com/api/v1.0/email/send",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });
});
