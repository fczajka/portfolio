import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Header from "@/components/Header/Header";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import { LocaleProvider } from "@/components/Providers/LocaleProvider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "dark",
    setTheme: vi.fn(),
  }),
}));

describe("Mobile navigation, menu layout, and locale selector placement", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";

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

  it("renders ToggleLocale only inside desktop header (no floating mobile language toggle)", () => {
    const { container } = render(
      <LocaleProvider>
        <Header />
      </LocaleProvider>,
    );

    const localeGroups = screen.getAllByRole("group", {
      name: "Select language",
    });
    expect(localeGroups).toHaveLength(1);

    const desktopHeader = container.querySelector("header");
    expect(desktopHeader).not.toBeNull();
    expect(desktopHeader?.contains(localeGroups[0])).toBe(true);
    expect(desktopHeader?.className).toContain("hidden");
    expect(desktopHeader?.className).toContain("lg:flex");
  });

  it("centers both Menu and Zamknij labels inside one accessible toggle button and opens the mobile menu with language toggle", () => {
    render(
      <LocaleProvider initialLocale="pl">
        <MobileNavbar />
      </LocaleProvider>,
    );

    const openButton = screen.getByRole("button", { name: "Otwórz menu" });
    expect(openButton.getAttribute("aria-expanded")).toBe("false");

    const menuLabel = screen.getByText("Menu");
    const closeLabel = screen.getByText("Zamknij");
    expect(menuLabel.parentElement).toBe(closeLabel.parentElement);
    expect(menuLabel.parentElement?.className).toContain("grid");
    expect(menuLabel.parentElement?.className).toContain("place-items-center");
    expect(menuLabel.className).toContain("col-start-1");
    expect(closeLabel.className).toContain("col-start-1");
    expect(menuLabel.getAttribute("aria-hidden")).toBe("false");
    expect(closeLabel.getAttribute("aria-hidden")).toBe("true");

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(openButton);

    const dialog = screen.getByRole("dialog", { name: "Nawigacja po stronie" });
    expect(dialog).toBeTruthy();

    const closeButton = screen.getByRole("button", { name: "Zamknij menu" });
    expect(closeButton.getAttribute("aria-expanded")).toBe("true");
    expect(menuLabel.getAttribute("aria-hidden")).toBe("true");
    expect(closeLabel.getAttribute("aria-hidden")).toBe("false");

    const localeGroup = screen.getByRole("group", { name: "Wybierz język" });
    expect(dialog.contains(localeGroup)).toBe(true);

    // Switching language inside mobile menu updates both menu and navbar copy
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(
      screen
        .getByRole("button", { name: "Close menu" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    expect(screen.getByText("WORK")).toBeTruthy();

    // Tapping a bottom navbar link while menu is open closes the menu
    fireEvent.click(screen.getByRole("link", { name: "My work" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
