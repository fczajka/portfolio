import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeTransitionProvider } from "@/components/Providers/ThemeTransitionProvider";
import ToggleTheme from "@/components/UI/ToggleTheme";

const setThemeMock = vi.fn();
const themeState = { resolvedTheme: "dark" };

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: themeState.resolvedTheme,
    setTheme: setThemeMock,
  }),
}));

function mockMatchMedia(reducedMotion: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches:
        query === "(prefers-reduced-motion: reduce)" ? reducedMotion : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe("ThemeTransitionProvider & ToggleTheme", () => {
  beforeEach(() => {
    themeState.resolvedTheme = "dark";
    setThemeMock.mockReset();
    document.documentElement.classList.remove("light", "dark");
    delete document.documentElement.dataset.themeTransition;
    mockMatchMedia(false);
  });

  afterEach(() => {
    cleanup();
    Reflect.deleteProperty(document, "startViewTransition");
    Reflect.deleteProperty(document.documentElement, "animate");
    document.documentElement.classList.remove("light", "dark");
    delete document.documentElement.dataset.themeTransition;
    vi.restoreAllMocks();
  });

  it("animates GPU clipPath from top-right to bottom-left via View Transitions and cleans up after finish", async () => {
    let resolveReady: (() => void) | undefined;
    let resolveFinished: (() => void) | undefined;
    const skipTransitionMock = vi.fn();
    const animateMock = vi.fn();

    Object.defineProperty(document.documentElement, "animate", {
      configurable: true,
      writable: true,
      value: animateMock,
    });

    const startViewTransitionMock = vi.fn((callback: () => void) => {
      callback();
      return {
        ready: new Promise<void>((resolve) => {
          resolveReady = resolve;
        }),
        finished: new Promise<void>((resolve) => {
          resolveFinished = resolve;
        }),
        skipTransition: skipTransitionMock,
      };
    });

    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      writable: true,
      value: startViewTransitionMock,
    });

    const { container } = render(
      <ThemeTransitionProvider>
        <ToggleTheme />
      </ThemeTransitionProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(startViewTransitionMock).toHaveBeenCalledTimes(1);
    expect(setThemeMock).toHaveBeenCalledWith("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.dataset.themeTransition).toBe("theme");
    expect(
      container.querySelector(
        '[style*="view-transition-name: theme-wave-crest"]',
      ),
    ).toBeNull();

    await act(async () => {
      resolveReady?.();
    });

    expect(animateMock).toHaveBeenCalledTimes(1);
    expect(animateMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          clipPath: expect.stringContaining(`at ${window.innerWidth}px 0px`),
        }),
      ]),
      expect.objectContaining({
        pseudoElement: "::view-transition-new(root)",
      }),
    );

    await act(async () => {
      resolveFinished?.();
    });

    expect(document.documentElement.dataset.themeTransition).toBeUndefined();
  });

  it("skips View Transitions when prefers-reduced-motion is enabled", () => {
    mockMatchMedia(true);
    const startViewTransitionMock = vi.fn();
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      writable: true,
      value: startViewTransitionMock,
    });

    render(
      <ThemeTransitionProvider>
        <ToggleTheme />
      </ThemeTransitionProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(startViewTransitionMock).not.toHaveBeenCalled();
    expect(setThemeMock).toHaveBeenCalledWith("light");
    expect(document.documentElement.dataset.themeTransition).toBeUndefined();
  });

  it("falls back directly to setTheme when startViewTransition is unsupported", () => {
    render(
      <ThemeTransitionProvider>
        <ToggleTheme />
      </ThemeTransitionProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(setThemeMock).toHaveBeenCalledWith("light");
    expect(document.documentElement.dataset.themeTransition).toBeUndefined();
  });
});
