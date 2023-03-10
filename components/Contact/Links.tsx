"use client";

import { LinksProps } from "@/public/types";
import React from "react";

export default function Links({ links, isVisible }: LinksProps) {
    const delays = [
        "[animation-delay:0.2s]",
        "[animation-delay:0.4s]",
        "[animation-delay:0.6s]",
    ];
    return (
        <div className="basis-full sm:px-32 md:px-44 lg:px-24">
            <ul>
                {links.map((link, index) => (
                    <li
                        key={link.text}
                        className={`my-6 opacity-0 ${
                            isVisible ? "animate-show-down-up" : ""
                        } motion-reduce:animate-none motion-reduce:opacity-100 ${
                            delays[index]
                        }`}
                    >
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
    );
}
