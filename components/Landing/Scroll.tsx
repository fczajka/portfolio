"use client";

import useElementOnScreen from "@/public/hooks/useElementOnScreen";
import { ScrollProps } from "@/public/types";

export default function Scroll({ letters }: ScrollProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    });

    const delays = [
        "[animation-delay:2.8s]",
        "[animation-delay:2.9s]",
        "[animation-delay:3.0s]",
        "[animation-delay:3.1s]",
        "[animation-delay:3.2s]",
        "[animation-delay:3.3s]",
    ];

    return (
        <div
            ref={containerRef}
            className="absolute flex flex-col items-center left-1/2 -translate-x-1/2 -bottom-12 sm:-bottom-16 md:-bottom-24 lg:left-1/4 lg:-translate-x-1/4 lg:-bottom-28"
        >
            <div className="relative flex mb-4 tracking-wider animate-fade-in [animation-delay:2.0s] motion-reduce:animate-none text-sm md:text-base">
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className={`animate-jump ${delays[index]} motion-reduce:animate-none`}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <div
                className={`w-0.5 h-28 bg-blue-200 opacity-0 ${
                    isVisible ? "animate-line" : ""
                } [transform-origin:bottom] [animation-delay:1.7s] motion-reduce:animate-none motion-reduce:opacity-100 min-[420px]:h-32 sm:h-40 md:h-60 lg:h-72`}
            ></div>
        </div>
    );
}
