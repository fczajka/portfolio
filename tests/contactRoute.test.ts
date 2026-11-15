import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { CONTACT_LIMITS } from "@/helpers/helpers";
import { getClientIp, resetRateLimitStore } from "@/lib/rateLimit";

function createJsonRequest(
  payload: unknown,
  headers: Record<string, string> = {},
): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}

describe("POST /api/contact", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    resetRateLimitStore();
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

  it("rejects non-object JSON payloads with 400", async () => {
    const response = await POST(createJsonRequest(["not", "an", "object"]));

    expect(response.status).toBe(400);
  });

  it("rejects messages exceeding length limits with 400", async () => {
    const response = await POST(
      createJsonRequest({
        senderName: "Jane",
        email: "jane@example.com",
        message: "a".repeat(CONTACT_LIMITS.message + 1),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("rejects oversized request bodies with 413", async () => {
    const oversized = JSON.stringify({
      senderName: "Jane",
      email: "jane@example.com",
      message: "x".repeat(17_000),
    });
    const response = await POST(createJsonRequest(oversized));

    expect(response.status).toBe(413);
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

  it("returns 504 when the EmailJS upstream request times out", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const timeoutError = new Error("The operation timed out.");
    timeoutError.name = "TimeoutError";
    vi.spyOn(globalThis, "fetch").mockRejectedValue(timeoutError);

    const response = await POST(
      createJsonRequest({
        senderName: "Jane Doe",
        email: "jane@example.com",
        message: "Hello!",
      }),
    );

    expect(response.status).toBe(504);
  });

  it("rate-limits repeated submissions from the same IP with 429", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("OK", { status: 200 }),
    );
    const ipHeader = { "x-forwarded-for": "203.0.113.42" };

    for (let i = 0; i < 5; i++) {
      const okResponse = await POST(
        createJsonRequest(
          {
            senderName: "Jane Doe",
            email: "jane@example.com",
            message: `Message ${i}`,
          },
          ipHeader,
        ),
      );
      expect(okResponse.status).toBe(200);
    }

    const blockedResponse = await POST(
      createJsonRequest(
        {
          senderName: "Jane Doe",
          email: "jane@example.com",
          message: "One too many",
        },
        ipHeader,
      ),
    );

    expect(blockedResponse.status).toBe(429);
    expect(Number(blockedResponse.headers.get("Retry-After"))).toBeGreaterThan(
      0,
    );
  });

  it("prefers cf-connecting-ip when extracting client IP", () => {
    const request = createJsonRequest(
      {},
      {
        "cf-connecting-ip": "198.51.100.7",
        "x-forwarded-for": "203.0.113.42",
        "x-real-ip": "203.0.113.99",
      },
    );

    expect(getClientIp(request)).toBe("198.51.100.7");
  });
});
