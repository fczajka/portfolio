import { contact } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import React from "react";
import Form from "./Form";

export default function Contact() {
    const { h3, links } = contact;
    return (
        <section id="contact-me" className="w-full px-4 py-16 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="w-full lg:w-1/2">
                    <h3
                        className={`text-center text-2xl ${lilitaOne.variable} font-lilita-one top-0 sm:text-3xl lg:text-4xl`}
                    >
                        {h3}
                    </h3>
                </div>
                <div className="flex flex-col pt-20 lg:flex-row">
                    <Form />
                    <div className="basis-full sm:px-32 md:px-44 lg:px-24">
                        <ul>
                            {links.map((link) => (
                                <li key={link.text} className="my-6">
                                    <a
                                        href={link.href}
                                        className="flex relative items-center max-w-fit after:[content:''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:transform_0.25s_ease-out] hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline"
                                    >
                                        {link.text} <link.icon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
