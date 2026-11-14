import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useAnimatedToggle from "@/hooks/useAnimatedToggle";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import useModalDismiss from "@/hooks/useModalDismiss";

describe("useAnimatedToggle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("opens immediately and delays unmount until exit animation completes", () => {
    const { result } = renderHook(() => useAnimatedToggle(700));

    expect(result.current.isOpen).toBe(false);
    expect(result.current.wantsToSee).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.wantsToSee).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.wantsToSee).toBe(false);
    expect(result.current.isOpen).toBe(true);

    act(() => {
      vi.advanceTimersByTime(699);
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("closes immediately when prefers-reduced-motion is enabled", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useAnimatedToggle(700));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.wantsToSee).toBe(false);
  });
});

describe("useElementOnScreen", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("observes element, sets visible on intersection, and disconnects cleanly", () => {
    const observe = vi.fn();
    const disconnect = vi.fn();
    let triggerCallback: IntersectionObserverCallback | null = null;

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0.2];
      constructor(cb: IntersectionObserverCallback) {
        triggerCallback = cb;
      }
      observe = observe;
      disconnect = disconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    function TestBox() {
      const [ref, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      });
      return <div ref={ref}>{isVisible ? "visible" : "hidden"}</div>;
    }

    const { getByText, unmount } = render(<TestBox />);
    expect(getByText("hidden")).toBeTruthy();
    expect(observe).toHaveBeenCalledTimes(1);

    act(() => {
      triggerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(getByText("visible")).toBeTruthy();
    expect(disconnect).toHaveBeenCalled();

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});

describe("useModalDismiss", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("delegates Escape when suspended and closes after animation delay on Escape or outside click", () => {
    const onClose = vi.fn();
    const onSuspendedEscape = vi.fn();

    function ModalHarness({ suspended }: { suspended: boolean }) {
      const containerRef = useRef<HTMLDivElement>(null);
      const { wantsToClose } = useModalDismiss({
        containerRef,
        onClose,
        closeDelayMs: 300,
        isSuspended: suspended,
        onSuspendedEscape,
      });
      return (
        <div>
          <div data-testid="outside">Outside</div>
          <div ref={containerRef} data-testid="modal">
            {wantsToClose ? "closing" : "open"}
          </div>
        </div>
      );
    }

    const { getByTestId, rerender } = render(<ModalHarness suspended={true} />);

    fireEvent.keyUp(document, { key: "Escape" });
    expect(onSuspendedEscape).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(getByTestId("outside"));
    expect(getByTestId("modal").textContent).toBe("open");

    rerender(<ModalHarness suspended={false} />);
    fireEvent.click(getByTestId("modal"));
    expect(getByTestId("modal").textContent).toBe("open");

    fireEvent.keyUp(document, { key: "Escape" });
    expect(getByTestId("modal").textContent).toBe("closing");
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
