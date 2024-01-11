import { headlineFont } from "@/public/fonts";
import { InputsAndLabelsProps } from "@/public/types";
import React from "react";

export default function Fields({ form, isVisible }: InputsAndLabelsProps) {
  const delays = [
    "[animation-delay:0.2s]",
    "[animation-delay:0.4s]",
    "[animation-delay:0.6s]",
  ];
  return (
    <>
      {form.map((section, index) => (
        <div
          className={`flex flex-col opacity-0 mt-6 first:mt-0 ${
            isVisible ? "animate-show-down-up" : ""
          } ${
            delays[index]
          } motion-reduce:animate-none motion-reduce:opacity-100`}
          key={section.label}
        >
          <label
            key={section.label}
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
              className="rounded-xl border-0 bg-primary-200 transition-all motion-reduce:transition-none focus:ring-2 focus:ring-primary-400 hover:bg-primary-300 focus:bg-primary-300 outline-none dark:bg-dark-secondary-bg dark:hover:bg-dark-tertiary-bg dark:focus:bg-dark-tertiary-bg dark:focus:ring-zinc-500"
            />
          ) : (
            <textarea
              id={section.htmlFor}
              name={section.htmlFor}
              className="resize-none rounded-xl border-0 bg-primary-200 transition-all motion-reduce:transition-none focus:ring-2 focus:ring-primary-400 hover:bg-primary-300 focus:bg-primary-300 outline-none dark:bg-dark-secondary-bg dark:hover:bg-dark-tertiary-bg dark:focus:bg-dark-tertiary-bg dark:focus:ring-zinc-500"
              rows={3}
              cols={30}
              wrap="soft"
            ></textarea>
          )}
        </div>
      ))}
    </>
  );
}
