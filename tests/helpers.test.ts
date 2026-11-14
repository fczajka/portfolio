import { describe, expect, it, vi, afterEach } from "vitest";
import {
  copyTextToClipboard,
  submitContactRequest,
  validateForm,
  validateFormFields,
} from "@/helpers/helpers";

describe("validateFormFields", () => {
  it("returns field errors when required fields are blank", () => {
    expect(
      validateFormFields({ name: "   ", mail: "", message: "\n" }),
    ).toEqual({
      senderName: "Please enter your name.",
      email: "Please enter your email address.",
      message: "Please enter a message.",
    });
  });

  it("flags malformed email addresses", () => {
    expect(
      validateFormFields({
        name: "Jane Doe",
        mail: "invalid-email",
        message: "Hello!",
      }),
    ).toEqual({
      email: "Please enter a valid email address.",
    });
  });

  it("returns an empty error map for valid input", () => {
    expect(
      validateFormFields({
        name: " Jane Doe ",
        mail: "jane@example.com ",
        message: " Interested in collaborating.",
      }),
    ).toEqual({});
  });
});

describe("validateForm", () => {
  it("reports missing form data before email format errors", () => {
    expect(validateForm({ name: "", mail: "bad", message: "Hi" })).toEqual({
      status: "error",
      message: "Missing form data!",
    });
  });

  it("reports incorrect email when all fields are non-empty", () => {
    expect(
      validateForm({ name: "Jane", mail: "bad-email", message: "Hi" }),
    ).toEqual({
      status: "error",
      message: "The email address is incorrect.",
    });
  });

  it("returns success when all fields pass validation", () => {
    expect(
      validateForm({
        name: "Jane",
        mail: "jane@example.com",
        message: "Hi",
      }),
    ).toEqual({
      status: "success",
      message: "Everything went well!",
    });
  });
});

describe("submitContactRequest", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("posts JSON payload to /api/contact and resolves on 200", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );

    await expect(
      submitContactRequest({
        senderName: "Jane",
        email: "jane@example.com",
        message: "Hello",
        company: "",
      }),
    ).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("throws server error message when response is non-ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 }),
    );

    await expect(
      submitContactRequest({
        senderName: "Jane",
        email: "bad",
        message: "Hello",
      }),
    ).rejects.toThrow("Invalid email");
  });
});

describe("copyTextToClipboard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses navigator.clipboard.writeText when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    await expect(copyTextToClipboard("franekczajkaa@gmail.com")).resolves.toBe(
      true,
    );
    expect(writeText).toHaveBeenCalledWith("franekczajkaa@gmail.com");
  });
});
