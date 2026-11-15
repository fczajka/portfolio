import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Form from "@/components/Contact/Form";
import { contact } from "@/data/content";

describe("Contact Form", () => {
  beforeEach(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly scrollMargin = "0px";
      readonly thresholds = [0.15];
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shows accessible field validation alerts when submitted empty", () => {
    render(<Form form={contact.form} button={contact.button} />);

    const submitButton = screen.getByRole("button", { name: "Submit form" });
    expect(submitButton.className).not.toContain("shadow-custom");
    fireEvent.click(submitButton);

    expect(document.getElementById("senderName-error")?.textContent).toBe(
      "Please enter your name.",
    );
    expect(screen.getByText("Please enter your email address.")).toBeTruthy();
    expect(screen.getByText("Please enter a message.")).toBeTruthy();
  });

  it("submits valid form payload to /api/contact and resets inputs", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );

    render(<Form form={contact.form} button={contact.button} />);

    const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
    const emailInput = screen.getByLabelText("E - mail:") as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      "Message:",
    ) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    fireEvent.change(messageInput, {
      target: { value: "Looking forward to working together!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit form" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({ method: "POST" }),
      );
      expect(nameInput.value).toBe("");
    });
  });
});
