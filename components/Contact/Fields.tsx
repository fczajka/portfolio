import { headlineFont } from "@/lib/fonts";
import type { InputsAndLabelsProps } from "@/types";
import { delays } from "./constants";

export default function Fields({
  form,
  isVisible,
  errors,
  onClearError,
}: InputsAndLabelsProps) {
  const baseFieldClass =
    "rounded-xl border-0 bg-primary-200 transition-all motion-reduce:transition-none focus:ring-2 focus:ring-primary-400 hover:bg-primary-300 focus:bg-primary-300 outline-none dark:bg-dark-secondary-bg dark:hover:bg-dark-tertiary-bg dark:focus:bg-dark-tertiary-bg dark:focus:ring-zinc-500";

  return (
    <>
      {form.map((section, index) => {
        const error = errors[section.htmlFor];
        const errorId = `${section.htmlFor}-error`;
        const errorRingClass = error
          ? "ring-2 ring-red-500 dark:ring-red-400"
          : "";

        return (
          <div
            className={`flex flex-col opacity-0 mt-6 first:mt-0 ${
              isVisible ? "animate-show-down-up" : ""
            } ${
              delays[index]
            } motion-reduce:animate-none motion-reduce:opacity-100`}
            key={section.label}
          >
            <label
              htmlFor={section.htmlFor}
              className={`mb-1 ${headlineFont.variable} font-headline text-lg`}
            >
              {section.label}
            </label>
            {section.type ? (
              <input
                type={section.type}
                id={section.htmlFor}
                name={section.htmlFor}
                autoComplete={section.autoComplete}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                onChange={() => {
                  if (error) onClearError(section.htmlFor);
                }}
                className={`${baseFieldClass} ${errorRingClass}`}
              />
            ) : (
              <textarea
                id={section.htmlFor}
                name={section.htmlFor}
                autoComplete={section.autoComplete}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                onChange={() => {
                  if (error) onClearError(section.htmlFor);
                }}
                className={`resize-none ${baseFieldClass} ${errorRingClass}`}
                rows={3}
                cols={30}
                wrap="soft"
              ></textarea>
            )}
            {error && (
              <p
                id={errorId}
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}
