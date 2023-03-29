import useElementOnScreen from "@/hooks/useElementOnScreen";
import { LinksProps } from "@/public/types";
import React from "react";

export default function Links({ links }: LinksProps) {
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
        <div
            ref={containerRef}
            className="basis-full sm:px-32 md:px-44 lg:px-24"
        >
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
                        {link.type === "link" ? (
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex relative text-xs items-center max-w-fit after:[content:''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:transform_0.25s_ease-out] sm:text-base min-[400px]:text-sm hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline"
                            >
                                <link.icon className="mr-2" /> {link.text}
                            </a>
                        ) : (
                            <a
                                href={`mailto:${link.href}`}
                                className="flex relative items-center max-w-fit after:[content:''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:transform_0.25s_ease-out] hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline"
                            >
                                <link.icon className="mr-2" /> {link.text}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
