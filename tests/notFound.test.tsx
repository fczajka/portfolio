import { cleanup, render, screen } from "@testing-library/react";
import { forwardRef, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/components/Providers/LocaleProvider";
import NotFoundView from "@/components/UI/NotFoundView";

vi.mock("next/link", () => ({
  default: forwardRef<
    HTMLAnchorElement,
    { href: string; children: ReactNode; className?: string }
  >(function MockLink({ href, children, ...rest }, ref) {
    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    );
  }),
}));

describe("NotFoundView", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders English 404 copy, portrait, and EN navigation links", () => {
    render(
      <LocaleProvider initialLocale="en">
        <NotFoundView />
      </LocaleProvider>,
    );

    expect(screen.getByText("404")).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("img", {
        name: "Animated line-art portrait of Franciszek Czajka",
      }),
    ).toBeTruthy();

    expect(
      screen.getByRole("link", { name: "Back to home" }).getAttribute("href"),
    ).toBe("/");
    expect(
      screen.getByRole("link", { name: "View my work" }).getAttribute("href"),
    ).toBe("/#my-work");
  });

  it("renders Polish 404 copy and /pl navigation links when Polish locale is active", () => {
    render(
      <LocaleProvider initialLocale="pl">
        <NotFoundView />
      </LocaleProvider>,
    );

    expect(screen.getByText("404")).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Nie znaleziono strony" }),
    ).toBeTruthy();

    expect(
      screen
        .getByRole("link", { name: "Wróć na stronę główną" })
        .getAttribute("href"),
    ).toBe("/pl");
    expect(
      screen
        .getByRole("link", { name: "Zobacz projekty" })
        .getAttribute("href"),
    ).toBe("/pl#my-work");
  });
});
