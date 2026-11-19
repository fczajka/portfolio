import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import type { StaticImageData } from "next/image";
import { forwardRef, type ImgHTMLAttributes } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AboutMe from "@/components/AboutMe/AboutMe";
import { LocaleProvider } from "@/components/Providers/LocaleProvider";
import ToggleLocale from "@/components/UI/ToggleLocale";

vi.mock("next/image", () => ({
  default: forwardRef<
    HTMLImageElement,
    Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
      src: string | StaticImageData;
    }
  >(function MockImage({ src, alt, ...rest }, ref) {
    const resolvedSrc = typeof src === "string" ? src : src.src;
    return <img ref={ref} src={resolvedSrc} alt={alt} {...rest} />;
  }),
}));

function mockImageCanvasPixels(pixels: number[]) {
  return vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () =>
      ({
        drawImage: vi.fn(),
        getImageData: () => ({
          data: new Uint8ClampedArray(pixels),
        }),
      }) as unknown as CanvasRenderingContext2D,
  );
}

describe("Clickable Food Cards & Kitchen Notes Modal", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

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
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("extracts average photo color onto hover border CSS variables just like project cards", () => {
    // Warm amber caramel color
    mockImageCanvasPixels([210, 120, 30, 255, 210, 120, 30, 255]);

    render(
      <LocaleProvider initialLocale="en">
        <AboutMe />
      </LocaleProvider>,
    );

    const cremeButton = screen.getByRole("button", {
      name: "Read kitchen notes for Crème Caramel",
    });
    expect(cremeButton.className).toContain(
      "hover:outline-[color:var(--project-border-light,#60a5fa)]",
    );
    expect(cremeButton.className).toContain(
      "dark:hover:outline-[color:var(--project-border-dark,#60a5fa)]",
    );

    const cremeImg = screen.getByAltText("Crème Caramel") as HTMLImageElement;
    Object.defineProperties(cremeImg, {
      complete: { value: true, configurable: true },
      naturalWidth: { value: 400, configurable: true },
      naturalHeight: { value: 400, configurable: true },
    });

    fireEvent.load(cremeImg);

    expect(
      cremeButton.style.getPropertyValue("--project-border-light"),
    ).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    expect(cremeButton.style.getPropertyValue("--project-border-dark")).toMatch(
      /^rgb\(\d+, \d+, \d+\)$/,
    );
  });

  it("opens an accessible modal with notes, method, and highlights, and closes via button or Escape", () => {
    vi.useFakeTimers();

    render(
      <LocaleProvider initialLocale="en">
        <AboutMe />
      </LocaleProvider>,
    );

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Read kitchen notes for Pizza" }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeTruthy();
    expect(screen.getByText("Kitchen notes")).toBeTruthy();
    expect(screen.getByText("High-hydration dough")).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "Close kitchen notes for Pizza" }),
    );

    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(screen.queryByRole("dialog")).toBeNull();

    // Open Steak and dismiss with Escape (keyup)
    fireEvent.click(
      screen.getByRole("button", { name: "Read kitchen notes for Steak" }),
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Deep Maillard crust")).toBeTruthy();
    expect(screen.getByText("Thyme, rosemary & garlic butter")).toBeTruthy();

    fireEvent.keyUp(document, { key: "Escape" });
    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders localized Polish dish cards and kitchen notes modal after switching to PL", () => {
    render(
      <LocaleProvider>
        <ToggleLocale />
        <AboutMe />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Polski" }));

    fireEvent.click(
      screen.getByRole("button", {
        name: "Zobacz notatki kulinarne: Stek",
      }),
    );

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Z mojej kuchni")).toBeTruthy();
    expect(screen.getByText("Wyrazista skórka Maillarda")).toBeTruthy();
    expect(
      screen.getByText("Masło, tymianek, rozmaryn i czosnek"),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", {
        name: "Zamknij notatki kulinarne: Stek",
      }),
    ).toBeTruthy();
  });
});
