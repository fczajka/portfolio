import { fireEvent, render, screen } from "@testing-library/react";
import type { StaticImageData } from "next/image";
import { forwardRef, type ImgHTMLAttributes } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Project from "@/components/MyWork/Project";

vi.mock("@/lib/fonts", () => ({
  headlineFont: { variable: "font-headline-mock" },
}));

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
import {
  extractAverageRgb,
  formatProjectBorderColors,
  hslToRgb,
  rgbToHsl,
} from "@/helpers/logoColor";

const mockStaticLogo: StaticImageData = {
  src: "/images/compressed/platterify_logo.webp",
  height: 56,
  width: 56,
  blurDataURL: "",
};

function mockImageCanvasPixels(pixels: number[]) {
  const getContextSpy = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockImplementation(
      () =>
        ({
          drawImage: vi.fn(),
          getImageData: () => ({
            data: new Uint8ClampedArray(pixels),
          }),
        }) as unknown as CanvasRenderingContext2D,
    );
  return getContextSpy;
}

describe("logoColor helpers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("extracts alpha-weighted average RGB and ignores transparent pixels", () => {
    // Two transparent pixels (black/white), two solid orange pixels (255, 152, 0)
    mockImageCanvasPixels([
      0, 0, 0, 0, 255, 255, 255, 10, 255, 152, 0, 255, 255, 152, 0, 255,
    ]);

    const img = document.createElement("img");
    Object.defineProperties(img, {
      complete: { value: true },
      naturalWidth: { value: 64 },
      naturalHeight: { value: 64 },
    });

    expect(extractAverageRgb(img)).toEqual({ r: 255, g: 152, b: 0 });
  });

  it("returns null when the image is incomplete or fully transparent", () => {
    const incompleteImg = document.createElement("img");
    Object.defineProperty(incompleteImg, "complete", { value: false });
    expect(extractAverageRgb(incompleteImg)).toBeNull();

    mockImageCanvasPixels([0, 0, 0, 0, 10, 20, 30, 15]);
    const transparentImg = document.createElement("img");
    Object.defineProperties(transparentImg, {
      complete: { value: true },
      naturalWidth: { value: 32 },
      naturalHeight: { value: 32 },
    });
    expect(extractAverageRgb(transparentImg)).toBeNull();
  });

  it("adapts pastel and dark averages into distinct light and dark border colors", () => {
    const pastel = formatProjectBorderColors({ r: 210, g: 235, b: 190 });
    const lightChannelMatch = pastel.lightBorder.match(/\d+/g)?.map(Number);
    const darkChannelMatch = pastel.darkBorder.match(/\d+/g)?.map(Number);

    expect(lightChannelMatch).toHaveLength(3);
    expect(darkChannelMatch).toHaveLength(3);

    const lightHsl = rgbToHsl({
      r: lightChannelMatch![0],
      g: lightChannelMatch![1],
      b: lightChannelMatch![2],
    });
    const darkHsl = rgbToHsl({
      r: darkChannelMatch![0],
      g: darkChannelMatch![1],
      b: darkChannelMatch![2],
    });

    expect(lightHsl.l).toBeLessThanOrEqual(0.51);
    expect(darkHsl.l).toBeGreaterThanOrEqual(0.5);

    const roundTrip = hslToRgb(lightHsl.h, lightHsl.s, lightHsl.l);
    expect(Math.abs(roundTrip.r - lightChannelMatch![0])).toBeLessThanOrEqual(
      1,
    );
  });
});

describe("Project dynamic logo border", () => {
  beforeEach(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0.1];
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("applies distinct CSS custom properties computed from the project logo on load", () => {
    mockImageCanvasPixels([255, 140, 0, 255, 255, 160, 0, 255]);

    const { container } = render(
      <Project
        name="Platterify"
        category="web"
        platform="Live Web App"
        shortDesc="Restaurant platform"
        techStack={["Next.js"]}
        longDesc="Full description"
        images={[]}
        links={[]}
        animationDelay="[animation-delay:0s]"
        buttonInfo={{ text: "Read more", type: "button" }}
        logo={mockStaticLogo}
        imagesInFormat="1:1"
      />,
    );

    const card = container.firstElementChild as HTMLDivElement;
    const logoImg = screen.getByAltText("Platterify logo") as HTMLImageElement;

    Object.defineProperties(logoImg, {
      complete: { value: true, configurable: true },
      naturalWidth: { value: 56, configurable: true },
      naturalHeight: { value: 56, configurable: true },
    });

    fireEvent.load(logoImg);

    expect(card.style.getPropertyValue("--project-border-light")).toMatch(
      /^rgb\(255, 150, 0\)$/,
    );
    expect(card.style.getPropertyValue("--project-border-dark")).toMatch(
      /^rgb\(255, 150, 0\)$/,
    );
    expect(card.style.getPropertyValue("--project-shadow")).toBe(
      "rgba(255, 150, 0, 0.25)",
    );
  });
});
