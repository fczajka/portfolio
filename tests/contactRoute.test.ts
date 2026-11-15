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
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_FROM_EMAIL = "Portfolio <contact@lapwingsoftware.com>";
    process.env.CONTACT_TO_EMAIL = "franekczajkaa@gmail.com";
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

  it("returns 503 when server Resend credentials are unconfigured", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    delete process.env.RESEND_API_KEY;

    const response = await POST(
      createJsonRequest({
        senderName: "Jane",
        email: "jane@example.com",
        message: "Hello!",
      }),
    );

    expect(response.status).toBe(503);
  });

  it("dispatches valid payloads to the Resend REST endpoint with escaped HTML", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ id: "email_123" }), { status: 200 }),
      );

    const response = await POST(
      createJsonRequest({
        senderName: "Jane <script>",
        email: "jane@example.com",
        message: "Line 1\n<b>Bold</b>",
      }),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer re_test_key",
          "Content-Type": "application/json",
          "User-Agent": "portfolio-contact/1.0",
        }),
      }),
    );

    const callOptions = fetchMock.mock.calls[0]?.[1];
    const sentBody = JSON.parse(String(callOptions?.body)) as {
      from: string;
      to: string[];
      reply_to: string;
      subject: string;
      html: string;
      text: string;
    };
    expect(sentBody.from).toBe("Portfolio <contact@lapwingsoftware.com>");
    expect(sentBody.to).toEqual(["franekczajkaa@gmail.com"]);
    expect(sentBody.reply_to).toBe("jane@example.com");
    expect(sentBody.html).toContain("&lt;script&gt;");
    expect(sentBody.html).toContain("Line 1<br />&lt;b&gt;Bold&lt;/b&gt;");
  });

  it("returns 504 when the Resend upstream request times out", async () => {
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
