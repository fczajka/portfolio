import { headlineFont } from "@/public/fonts";
import { InputsAndLabelsProps } from "@/public/types";
import React from "react";

export default function InputsAndLabels({
    form,
    isVisible,
}: InputsAndLabelsProps) {
    const delays = [
        "[animation-delay:0.2s]",
        "[animation-delay:0.4s]",
        "[animation-delay:0.6s]",
    ];
    return (
        <>
            {form.map((section, index) => (
                <React.Fragment key={section.label}>
                    <label
                        key={section.label}
                        htmlFor={section.htmlFor}
                        className={`mb-1 mt-6 ${
                            headlineFont.variable
                        } font-headline text-lg opacity-0 ${
                            isVisible ? "animate-show-down-up" : ""
                        } motion-reduce:animate-none motion-reduce:opacity-200 ${
                            delays[index]
                        } first:mt-0`}
                    >
                        {section.label}
                    </label>
                    {section.type ? (
                        <input
                            type={section.type}
                            id={section.htmlFor}
                            name={section.htmlFor}
                            className={`rounded-xl border-0 bg-primary-200 opacity-0 ${
                                isVisible && "animate-show-down-up"
                            } motion-reduce:animate-none motion-reduce:transition-none motion-reduce:opacity-200 ${
                                delays[index]
                            } transition-all focus:ring-1 focus:ring-primary-900 hover:bg-primary-300 focus:bg-primary-300 outline-none`}
                        />
                    ) : (
                        <textarea
                            id={section.htmlFor}
                            name={section.htmlFor}
                            className={`resize-none rounded-xl border-0 bg-primary-200 opacity-0 ${
                                isVisible && "animate-show-down-up"
                            } motion-reduce:animate-none motion-reduce:transition-none motion-reduce:opacity-200 ${
                                delays[index]
                            } transition-all focus:ring-1 focus:ring-primary-900 hover:bg-primary-300 focus:bg-primary-300 outline-none`}
                            rows={3}
                            cols={30}
                            wrap="soft"
                        ></textarea>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}
