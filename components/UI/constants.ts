export const iconsDelays = [
  "[animation-delay:0.35s]",
  "[animation-delay:0.42s]",
  "[animation-delay:0.49s]",
];

export const linksDelays = [
  "[animation-delay:0.28s]",
  "[animation-delay:0.36s]",
  "[animation-delay:0.44s]",
  "[animation-delay:0.52s]",
];

/** Shared logo-derived hover border classes for interactive cards (no hover shadow blur in light or dark theme). */
export const logoHoverCardClasses =
  "outline outline-1 outline-transparent hover:outline-[color:var(--project-border-light,#60a5fa)] dark:hover:outline-[color:var(--project-border-dark,#60a5fa)]";

/** Shared dimmed blurred modal overlay backdrop so dark cards lift cleanly off the page. */
export const modalOverlayClasses = "bg-zinc-950/75 backdrop-blur-xs";

/** Shared borderless modal card surface classes (no drop shadow). */
export const modalCardSurfaceClasses =
  "bg-zinc-200 dark:bg-dark-secondary-bg dark:text-zinc-200";
