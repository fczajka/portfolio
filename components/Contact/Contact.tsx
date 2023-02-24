import { contact } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import Link from "next/link";
import React from "react";
import Form from "./Form";

export default function Contact() {
    const { h3, form, button, links } = contact;
    return (
        <section className="w-full px-4 py-16 lg:px-12">
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
                                <li key={link.text} className="my-6 underline">
                                    <Link
                                        href={link.href}
                                        className="flex items-center max-w-fit"
                                    >
                                        {link.text} <link.icon />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
