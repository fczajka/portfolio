import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HeroPortrait from "@/components/Landing/HeroPortrait";
import { LocaleProvider } from "@/components/Providers/LocaleProvider";

function mockMatchMedia(reducedMotion: boolean, finePointer: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches:
        query === "(prefers-reduced-motion: reduce)"
          ? reducedMotion
          : query === "(pointer: fine)"
            ? finePointer
            : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe("HeroPortrait", () => {
  beforeEach(() => {
    mockMatchMedia(false, true);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders accessible portrait SVG and toggles animation classes based on visibility", () => {
    const { container, rerender } = render(<HeroPortrait isVisible={false} />);

    const svg = screen.getByRole("img", {
      name: "Animated line-art portrait of Franciszek Czajka",
    });
    expect(svg).toBeTruthy();
    expect(container.querySelector(".hero-stroke-active")).toBeNull();
    expect(container.querySelector(".hero-float-active")).toBeNull();

    rerender(<HeroPortrait isVisible />);

    expect(container.querySelector(".hero-stroke-active")).not.toBeNull();
    expect(container.querySelector(".hero-fill-active")).not.toBeNull();
    expect(container.querySelector(".hero-float-active")).not.toBeNull();
    expect(container.querySelector(".hero-blink-open-active")).not.toBeNull();
  });

  it("tracks pointer movement via CSS variables and cancels pending animation frames on unmount", () => {
    const rafCallbacks: FrameRequestCallback[] = [];
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });
    const cancelSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});

    const { container, unmount } = render(<HeroPortrait isVisible />);
    const wrapper = container.firstElementChild as HTMLDivElement;

    vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 100,
      right: 500,
      bottom: 500,
      width: 400,
      height: 400,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });

    const moveEvent = new Event("pointermove", {
      bubbles: true,
    }) as PointerEvent;
    Object.defineProperties(moveEvent, {
      pointerType: { value: "mouse" },
      clientX: { value: 480 },
      clientY: { value: 260 },
    });

    window.dispatchEvent(moveEvent);
    expect(rafSpy).toHaveBeenCalledTimes(1);

    rafCallbacks[0]?.(16);
    expect(Number(wrapper.style.getPropertyValue("--px"))).toBeGreaterThan(0);

    fireEvent.mouseLeave(document);
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it("disables pointer tracking when prefers-reduced-motion is enabled", () => {
    mockMatchMedia(true, true);
    const rafSpy = vi.spyOn(window, "requestAnimationFrame");

    const { container } = render(<HeroPortrait isVisible />);
    const wrapper = container.firstElementChild as HTMLDivElement;

    const moveEvent = new Event("pointermove", {
      bubbles: true,
    }) as PointerEvent;
    Object.defineProperties(moveEvent, {
      pointerType: { value: "mouse" },
      clientX: { value: 300 },
      clientY: { value: 300 },
    });

    window.dispatchEvent(moveEvent);

    expect(wrapper.style.getPropertyValue("--px")).toBe("0");
    expect(wrapper.style.getPropertyValue("--py")).toBe("0");
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("waves, winks, and says hi in a speech bubble when clicked, then hides after timeout", () => {
    vi.useFakeTimers();
    const { container } = render(<HeroPortrait isVisible />);

    const greetButton = screen.getByRole("button", {
      name: "Say hi to Franciszek",
    });

    expect(screen.queryByRole("status")).toBeNull();
    expect(container.querySelector(".hero-wave-active")).toBeNull();

    fireEvent.click(greetButton);

    const status = screen.getByRole("status");
    expect(status.textContent).toContain("Hi there!");
    expect(status.className).toContain("bg-zinc-200");
    expect(status.className).toContain("dark:bg-dark-secondary-bg");
    expect(status.className).not.toContain("border-2");
    expect(status.className).not.toContain("shadow-custom");
    expect(container.querySelector(".hero-wave-active")).not.toBeNull();

    fireEvent.click(greetButton);
    expect(screen.getByRole("status").textContent).toContain(
      "Nice to meet you!",
    );

    act(() => {
      vi.advanceTimersByTime(3200);
    });

    expect(screen.queryByRole("status")).toBeNull();
    expect(container.querySelector(".hero-wave-active")).toBeNull();
  });

  it("speaks Polish greetings when LocaleProvider is set to pl", () => {
    render(
      <LocaleProvider initialLocale="pl">
        <HeroPortrait isVisible />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("img", {
        name: "Animowany portret liniowy Franciszka Czajki",
      }),
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "Przywitaj się z Franciszkiem" }),
    );

    expect(screen.getByRole("status").textContent).toContain("Cześć!");
  });
});
