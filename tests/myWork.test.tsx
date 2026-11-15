import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import type { StaticImageData } from "next/image";
import { forwardRef, type ImgHTMLAttributes, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MyWork from "@/components/MyWork/MyWork";
import RelatedProjectCard from "@/components/MyWork/RelatedProjectCard";
import { myWork } from "@/data/content";
import { projectsMeta } from "@/data/projectsMeta";

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

describe("MyWork", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
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
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("filters projects by Web and Mobile categories", () => {
    render(<MyWork />);

    expect(screen.getByText("Platterify")).toBeTruthy();
    expect(screen.getByText("Kippr")).toBeTruthy();
    expect(screen.getByText("Storis")).toBeTruthy();
    expect(screen.getByText("Knowla - Web")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /^Web/i }));
    expect(screen.getByText("Platterify")).toBeTruthy();
    expect(screen.getByText("Knowla - Web")).toBeTruthy();
    expect(screen.queryByText("Kippr")).toBeNull();
    expect(screen.queryByText("Storis")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /^Mobile/i }));
    expect(screen.getByText("Kippr")).toBeTruthy();
    expect(screen.getByText("Storis")).toBeTruthy();
    expect(screen.queryByText("Platterify")).toBeNull();
  });

  it("opens project modal, points Full page to /projects/[slug], and copies canonical project URL", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<MyWork />);

    fireEvent.click(
      screen.getByRole("button", { name: "Check the details of Platterify" }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeTruthy();

    const fullPageLink = screen.getByRole("link", {
      name: "Open full case study page for Platterify",
    });
    expect(fullPageLink.getAttribute("href")).toBe("/projects/platterify");

    fireEvent.click(
      screen.getByRole("button", { name: "Copy link to Platterify" }),
    );

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        `${window.location.origin}/projects/platterify`,
      );
    });
  });

  it("opens the matching modal automatically when ?project=slug is present in the URL", () => {
    window.history.replaceState(null, "", "/?project=kippr");

    render(<MyWork />);

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(
      screen.getByRole("link", {
        name: "Open full case study page for Kippr",
      }),
    ).toBeTruthy();
  });

  it("provides dedicated non-repetitive caseStudy sections for every project", () => {
    for (const project of projectsMeta) {
      const { challenge, architecture, highlights } = project.caseStudy;

      expect(challenge.trim().length).toBeGreaterThan(40);
      expect(architecture.trim().length).toBeGreaterThan(40);
      expect(highlights.length).toBeGreaterThanOrEqual(3);
      for (const item of highlights) {
        expect(item.trim().length).toBeGreaterThan(15);
      }

      expect(challenge).not.toBe(project.shortDesc);
      expect(challenge).not.toBe(project.longDesc);
      expect(architecture).not.toBe(project.shortDesc);
      expect(architecture).not.toBe(project.longDesc);
      expect(challenge).not.toContain(project.shortDesc);
      expect(architecture).not.toContain(project.longDesc);
    }
  });

  it("renders RelatedProjectCard with shared logo hover border, no hover shadow blur, and 1:1 logo framing", () => {
    const knowla = myWork.projects.find((item) => item.name === "Knowla - Web");
    expect(knowla).toBeDefined();
    if (!knowla) return;

    render(<RelatedProjectCard project={knowla} slug="knowla-web" />);

    const cardLink = screen.getByRole("link", { name: /Knowla - Web/i });
    expect(cardLink.className).toContain(
      "hover:outline-[color:var(--project-border-light,#60a5fa)]",
    );
    expect(cardLink.className).not.toContain("hover:shadow-xl");

    const logo = screen.getByAltText("Knowla - Web logo");
    expect(logo.className).toContain("object-cover");
    expect(logo.parentElement?.className).toContain("h-9 w-9");
  });
});
