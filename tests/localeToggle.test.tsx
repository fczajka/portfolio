import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import type { StaticImageData } from "next/image";
import { forwardRef, type ImgHTMLAttributes, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AboutMe from "@/components/AboutMe/AboutMe";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Landing from "@/components/Landing/Landing";
import MyWork from "@/components/MyWork/MyWork";
import {
  LOCALE_STORAGE_KEY,
  LocaleProvider,
} from "@/components/Providers/LocaleProvider";
import ToggleLocale from "@/components/UI/ToggleLocale";
import { getContent } from "@/data/content";
import { getProjectsMeta } from "@/data/projectsMeta";

vi.mock("next/image", () => ({
  default: forwardRef<
    HTMLImageElement,
    Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
      src: string | StaticImageData;
      fill?: boolean;
      placeholder?: string;
    }
  >(function MockImage(
    { src, alt, fill: _fill, placeholder: _placeholder, ...rest },
    ref,
  ) {
    const resolvedSrc = typeof src === "string" ? src : src.src;
    return <img ref={ref} src={resolvedSrc} alt={alt} {...rest} />;
  }),
}));

vi.mock("next/link", () => ({
  default: forwardRef<
    HTMLAnchorElement,
    {
      href: string;
      children: ReactNode;
      className?: string;
    }
  >(function MockLink({ href, children, ...rest }, ref) {
    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    );
  }),
}));

describe("Bilingual EN / PL Toggle", () => {
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

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly scrollMargin = "0px";
      readonly thresholds = [0.1];
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    Reflect.deleteProperty(document, "startViewTransition");
    Reflect.deleteProperty(document.documentElement, "animate");
    delete document.documentElement.dataset.themeTransition;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("toggles between EN and PL, persists selection, and updates document lang", () => {
    render(
      <LocaleProvider>
        <ToggleLocale />
        <Landing />
      </LocaleProvider>,
    );

    const enButton = screen.getByRole("button", { name: "English" });
    const plButton = screen.getByRole("button", { name: "Polski" });

    expect(enButton.getAttribute("aria-pressed")).toBe("true");
    expect(plButton.getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByText("Hi, my name is Franciszek")).toBeTruthy();
    expect(document.documentElement.lang).toBe("en");

    fireEvent.click(plButton);

    expect(enButton.getAttribute("aria-pressed")).toBe("false");
    expect(plButton.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Cześć, jestem Franciszek")).toBeTruthy();
    expect(document.documentElement.lang).toBe("pl");
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pl");

    fireEvent.click(enButton);
    expect(screen.getByText("Hi, my name is Franciszek")).toBeTruthy();
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en");
  });

  it("restores saved Polish locale from localStorage on mount", () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, "pl");

    render(
      <LocaleProvider>
        <Landing />
        <MyWork />
        <AboutMe />
        <Footer />
      </LocaleProvider>,
    );

    expect(screen.getByText("Cześć, jestem Franciszek")).toBeTruthy();
    expect(screen.getByText("Stwórzmy coś razem")).toBeTruthy();
    expect(screen.getByRole("button", { name: /^Wszystkie/i })).toBeTruthy();
    expect(screen.getByText("Poznajmy się!")).toBeTruthy();
    expect(screen.getByText("Doświadczenie komercyjne")).toBeTruthy();
    expect(screen.getByText("Wróć na górę")).toBeTruthy();
  });

  it("validates the contact form in Polish when PL locale is active", () => {
    render(
      <LocaleProvider initialLocale="pl">
        <Contact />
      </LocaleProvider>,
    );

    expect(screen.getByText("Napisz do mnie!")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Wyślij formularz" }));

    expect(document.getElementById("senderName-error")?.textContent).toBe(
      "Proszę podać swoje imię.",
    );
    expect(screen.getByText("Proszę podać adres e-mail.")).toBeTruthy();
    expect(screen.getByText("Proszę wpisać wiadomość.")).toBeTruthy();
  });

  it("keeps full project and content parity between EN and PL dictionaries", () => {
    const enProjects = getProjectsMeta("en");
    const plProjects = getProjectsMeta("pl");

    expect(plProjects.map((p) => p.slug)).toEqual(
      enProjects.map((p) => p.slug),
    );
    for (let i = 0; i < enProjects.length; i++) {
      expect(plProjects[i]?.techStack).toEqual(enProjects[i]?.techStack);
      expect(plProjects[i]?.links.length).toBe(enProjects[i]?.links.length);
      expect(plProjects[i]?.caseStudy.highlights.length).toBe(
        enProjects[i]?.caseStudy.highlights.length,
      );
      expect(plProjects[i]?.shortDesc.length).toBeGreaterThan(40);
      expect(plProjects[i]?.caseStudy.challenge).not.toBe(
        enProjects[i]?.caseStudy.challenge,
      );
    }

    const enContent = getContent("en");
    const plContent = getContent("pl");
    expect(plContent.header.links.length).toBe(enContent.header.links.length);
    expect(plContent.aboutMe.experience.milestones.length).toBe(
      enContent.aboutMe.experience.milestones.length,
    );
    expect(plContent.aboutMe.foods.length).toBe(enContent.aboutMe.foods.length);
  });

  it("keeps Food cards observed across EN -> PL switch so photos reveal on scroll", () => {
    const observedMap = new Map<Element, IntersectionObserverCallback>();

    class TrackingIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly scrollMargin = "0px";
      readonly thresholds = [0.15];
      private readonly cb: IntersectionObserverCallback;

      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
      }

      observe = vi.fn((el: Element) => {
        observedMap.set(el, this.cb);
      });
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
    }

    vi.stubGlobal("IntersectionObserver", TrackingIntersectionObserver);

    render(
      <LocaleProvider>
        <ToggleLocale />
        <AboutMe />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Polski" }));

    const pizzaImage = screen.getByAltText("Domowa pizza");
    const pizzaCard = pizzaImage.parentElement as HTMLElement;

    expect(observedMap.has(pizzaCard)).toBe(true);
    expect(pizzaCard.className).not.toContain("animate-show-down-up");

    act(() => {
      const cb = observedMap.get(pizzaCard);
      cb?.(
        [
          {
            isIntersecting: true,
            target: pizzaCard,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    expect(pizzaCard.className).toContain("animate-show-down-up");
  });

  it("animates circular clipPath and fading old layer via View Transitions from the language toggle", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: "",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    let resolveReady: (() => void) | undefined;
    let resolveFinished: (() => void) | undefined;
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
        skipTransition: vi.fn(),
      };
    });

    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      writable: true,
      value: startViewTransitionMock,
    });

    render(
      <LocaleProvider>
        <ToggleLocale />
        <Landing />
      </LocaleProvider>,
    );

    const enButton = screen.getByRole("button", { name: "English" });
    const plButton = screen.getByRole("button", { name: "Polski" });

    fireEvent.click(enButton);
    expect(startViewTransitionMock).not.toHaveBeenCalled();

    vi.spyOn(plButton, "getBoundingClientRect").mockReturnValue({
      left: 900,
      top: 16,
      right: 940,
      bottom: 44,
      width: 40,
      height: 28,
      x: 900,
      y: 16,
      toJSON: () => ({}),
    });

    fireEvent.click(plButton);

    expect(startViewTransitionMock).toHaveBeenCalledTimes(1);
    expect(document.documentElement.dataset.themeTransition).toBe("locale");
    expect(screen.getByText("Cześć, jestem Franciszek")).toBeTruthy();

    await act(async () => {
      resolveReady?.();
    });

    expect(animateMock).toHaveBeenCalledTimes(2);
    expect(animateMock).toHaveBeenNthCalledWith(
      1,
      expect.arrayContaining([
        expect.objectContaining({
          clipPath: "circle(0px at 920px 30px)",
        }),
      ]),
      expect.objectContaining({
        pseudoElement: "::view-transition-new(root)",
      }),
    );
    expect(animateMock).toHaveBeenNthCalledWith(
      2,
      expect.arrayContaining([
        expect.objectContaining({ opacity: 1 }),
        expect.objectContaining({ opacity: 0 }),
      ]),
      expect.objectContaining({
        pseudoElement: "::view-transition-old(root)",
      }),
    );

    await act(async () => {
      resolveFinished?.();
    });

    expect(document.documentElement.dataset.themeTransition).toBeUndefined();
  });
});
