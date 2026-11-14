import { headlineFont } from "@/lib/fonts";
import type { ButtonProps } from "@/types";

export default function Button(props: ButtonProps) {
  const baseClassName = `${
    props.style ?? ""
  } text-sm px-4 py-2 rounded-full bg-primary-200 ${
    headlineFont.variable
  } font-headline transition-colors dark:text-zinc-900 motion-reduce:transition-none lg:text-base`;

  if (props.disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label={props.aria}
        className={`${baseClassName} opacity-50 cursor-not-allowed dark:opacity-25 dark:bg-zinc-400`}
      >
        {props.text}
      </button>
    );
  }

  if (props.type === "button") {
    return (
      <button
        onClick={props.callback}
        type="button"
        aria-label={props.aria}
        className={`${baseClassName} hover:bg-primary-300 focus:bg-primary-300`}
      >
        {props.text}
      </button>
    );
  }

  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.aria}
      className={`${baseClassName} hover:bg-primary-300 focus:bg-primary-300`}
    >
      {props.text}
    </a>
  );
}
