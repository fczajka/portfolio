import { lilitaOne } from "@/public/fonts";
import { FormProps } from "@/public/types";
import React from "react";

export default function Form({ form, button, isVisible }: FormProps) {
    const delays = [
        "[animation-delay:0.2s]",
        "[animation-delay:0.4s]",
        "[animation-delay:0.6s]",
    ];

    return (
        <form
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
                            className={`rounded-md border-0 bg-blue-200 opacity-0 ${
                                isVisible ? "animate-show-down-up" : ""
                            } motion-reduce:animate-none motion-reduce:opacity-100 ${
                                delays[index]
                            }`}
                        ></input>
                    ) : (
                        <textarea
                            className={`resize-none rounded-md border-0 bg-blue-200 opacity-0 ${
                                isVisible ? "animate-show-down-up" : ""
                            } motion-reduce:animate-none motion-reduce:opacity-100 ${
                                delays[index]
                            }`}
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
                className={`bg-blue-300 rounded-md my-6 p-4 ${
                    lilitaOne.variable
                } font-lilita-one opacity-0 ${
                    isVisible ? "animate-show-down-up" : ""
                } [animation-delay:0.8s] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none tracking-wider text-lg transition-all duration-300 hover:bg-blue-400`}
            >
                {button.text}
            </button>
        </form>
    );
}
