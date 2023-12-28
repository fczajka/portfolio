import { LinkProps } from "@/public/types";
import React from "react";

export default function Link({
  href,
  icon: Icon,
  type,
  delay,
  isVisible,
}: LinkProps) {
  return (
    <li
      key={href}
      className={`my-6 opacity-0 text-xs min-[400px]:text-sm sm:text-base ${
        isVisible ? "animate-show-down-up" : ""
      }  motion-reduce:animate-none motion-reduce:opacity-100 ${delay}`}
    >
      <a
        href={type === "link" ? href : `mailto:${href}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex relative items-center max-w-fit after:[content:''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:transform_0.25s_ease-out] hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline"
      >
        <Icon className="mr-2" /> {href}
      </a>
    </li>
  );
}
