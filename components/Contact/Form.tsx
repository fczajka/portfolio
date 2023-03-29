"use client";

import { lilitaOne } from "@/public/fonts";
import useElementOnScreen from "@/public/hooks/useElementOnScreen";
import { FormProps } from "@/public/types";
import React from "react";

export default function Form({ form, button }: FormProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    });

    const delays = [
        "[animation-delay:0.2s]",
        "[animation-delay:0.4s]",
        "[animation-delay:0.6s]",
    ];

    return (
        <form
            ref={containerRef}
            action="post"
            className="flex flex-col basis-full sm:px-32 md:px-44 lg:px-24"
        >
            {form.map((section, index) => (
                <React.Fragment key={section.label}>
                    <label
                        key={section.label}
                        htmlFor={section.htmlFor}
                        className={`mb-1 mt-6 ${
                            lilitaOne.variable
                        } font-lilita-one text-lg opacity-0 ${
                            isVisible ? "animate-show-down-up" : ""
                        } motion-reduce:animate-none motion-reduce:opacity-100 ${
                            delays[index]
                        } first:mt-0`}
                    >
                        {section.label}
                    </label>
                    {section.type ? (
                        <input
                            type={section.type}
                            name={section.htmlFor}
                            className={`rounded-xl border-0 bg-blue-200 opacity-0 ${
                                isVisible ? "animate-show-down-up" : ""
                            } motion-reduce:animate-none motion-reduce:opacity-100 ${
                                delays[index]
                            } transition-all focus:bg-blue-300`}
                        ></input>
                    ) : (
                        <textarea
                            className={`resize-none rounded-xl border-0 bg-blue-200 opacity-0 ${
                                isVisible ? "animate-show-down-up" : ""
                            } motion-reduce:animate-none motion-reduce:opacity-100 ${
                                delays[index]
                            } transition-all focus:bg-blue-300`}
                            name={section.htmlFor}
                            rows={3}
                            cols={30}
                            wrap="soft"
                        ></textarea>
                    )}
                </React.Fragment>
            ))}
            <button
                type="button"
                className={`bg-blue-200 rounded-xl my-6 p-4 ${
                    lilitaOne.variable
                } font-lilita-one opacity-0 ${
                    isVisible ? "animate-show-down-up" : ""
                } [animation-delay:0.8s] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none tracking-wider text-lg transition-all duration-300 hover:bg-blue-300 hover:shadow-custom focus:bg-blue-300`}
            >
                {button.text}
            </button>
        </form>
    );
}
