import { contact } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import React from "react";

export default function Form() {
    const { form, button } = contact;
    return (
        <form
            action="post"
            className="flex flex-col basis-full sm:px-32 md:px-44 lg:px-24"
        >
            {form.map((section) => (
                <React.Fragment key={section.label}>
                    <label
                        key={section.label}
                        htmlFor={section.htmlFor}
                        className={`mb-1 mt-6 ${lilitaOne.variable} font-lilita-one text-lg first:mt-0`}
                    >
                        {section.label}
                    </label>
                    {section.type ? (
                        <input
                            type={section.type}
                            name={section.htmlFor}
                            className="rounded-md border-0 bg-blue-200"
                        ></input>
                    ) : (
                        <textarea
                            className="resize-none rounded-md border-0 bg-blue-200"
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
                className={`bg-blue-300 rounded-md my-6 p-4 ${lilitaOne.variable} font-lilita-one tracking-wider text-lg hover:animate-button-background motion-reduce:animate-none`}
            >
                {button.text}
            </button>
        </form>
    );
}
