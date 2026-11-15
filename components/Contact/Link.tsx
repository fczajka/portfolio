import type { LinkProps } from "@/types";

export default function Link({
  href,
  icon: Icon,
  type,
  delay,
  isVisible,
}: LinkProps) {
  return (
    <li
      className={`my-6 opacity-0 text-xs min-[400px]:text-sm sm:text-base ${
        isVisible ? "animate-show-down-up" : ""
      }  motion-reduce:animate-none motion-reduce:opacity-100 ${delay}`}
    >
      <a
        href={type === "link" ? href : `mailto:${href}`}
        target={type === "link" ? "_blank" : undefined}
        rel={type === "link" ? "noopener noreferrer" : undefined}
        className="flex relative items-center max-w-fit after:[content:''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:scale_0.25s_ease-out] hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline dark:after:bg-zinc-500"
      >
        <Icon className="mr-2" aria-hidden="true" /> {href}
      </a>
    </li>
  );
}
