import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ExperienceTimeline from "@/components/AboutMe/ExperienceTimeline";
import { aboutMe } from "@/data/content";

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

describe("ExperienceTimeline", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders sticky commercial snapshot, desktop-only core stack groups, CV CTA, and all milestones", () => {
    render(<ExperienceTimeline experience={aboutMe.experience} />);

    expect(screen.queryByText("Commercial Experience")).toBeNull();
    expect(screen.getByText(aboutMe.experience.headline)).toBeTruthy();

    const coreStackHeading = screen.getByText("Core Stack");
    expect(coreStackHeading.parentElement?.className).toContain("hidden");
    expect(coreStackHeading.parentElement?.className).toContain("lg:block");
    expect(screen.getByText("Enterprise & Backend")).toBeTruthy();
    expect(screen.getByText("Frontend & Web")).toBeTruthy();
    expect(screen.getByText("Team & Practices")).toBeTruthy();

    const cvLink = screen.getByRole("link", {
      name: new RegExp(aboutMe.experience.cv.label, "i"),
    });
    expect(cvLink.getAttribute("href")).toBe(
      aboutMe.experience.cv.downloadUrl ?? aboutMe.experience.cv.href,
    );
    expect(cvLink.hasAttribute("download")).toBe(true);
    expect(cvLink.getAttribute("target")).toBeNull();
    expect(cvLink.className).not.toContain("shadow-custom");

    for (const milestone of aboutMe.experience.milestones) {
      expect(screen.getByText(milestone.eyebrow)).toBeTruthy();
      expect(screen.getAllByText(milestone.title).length).toBeGreaterThan(0);
      if (milestone.period) {
        expect(screen.getByText(milestone.period)).toBeTruthy();
      }
      if (milestone.logoAlt) {
        expect(screen.getByAltText(milestone.logoAlt)).toBeTruthy();
      }
      if (milestone.roles) {
        for (const subRole of milestone.roles) {
          expect(screen.getByText(subRole.description)).toBeTruthy();
        }
      }
    }
  });

  it("renders direct download link with custom label when cv.downloadUrl is configured", () => {
    render(
      <ExperienceTimeline
        experience={{
          ...aboutMe.experience,
          cv: {
            label: "Download CV / Resume",
            href: "/#contact-me",
            downloadUrl: "/Franciszek_Czajka_CV.pdf",
          },
        }}
      />,
    );

    const downloadLink = screen.getByRole("link", {
      name: /Download CV \/ Resume/i,
    });
    expect(downloadLink.getAttribute("href")).toBe("/Franciszek_Czajka_CV.pdf");
    expect(downloadLink.hasAttribute("download")).toBe(true);
    expect(downloadLink.getAttribute("target")).toBeNull();
  });

  it("falls back to cv.href without download when cv.downloadUrl is omitted", () => {
    render(
      <ExperienceTimeline
        experience={{
          ...aboutMe.experience,
          cv: {
            label: "Request CV / Resume",
            href: "/#contact-me",
          },
        }}
      />,
    );

    const fallbackLink = screen.getByRole("link", {
      name: /Request CV \/ Resume/i,
    });
    expect(fallbackLink.getAttribute("href")).toBe("/#contact-me");
    expect(fallbackLink.hasAttribute("download")).toBe(false);
  });

  it("activates all checkpoints immediately when prefers-reduced-motion is enabled", () => {
    mockMatchMedia(true);

    const { container } = render(
      <ExperienceTimeline experience={aboutMe.experience} />,
    );

    const listItems = container.querySelectorAll("ol > li");
    expect(listItems.length).toBe(aboutMe.experience.milestones.length);
    listItems.forEach((item) => {
      const article = item.querySelector("article");
      expect(article?.getAttribute("data-active")).toBe("true");
      expect(article?.className).toContain(
        "hover:outline-[color:var(--project-border-light,#60a5fa)]",
      );
    });
  });
});
