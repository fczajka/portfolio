"use client";

import { headlineFont } from "@/public/fonts";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import { PanelProps } from "@/public/types";

export default function SubPanel({ headline, desc }: PanelProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    });
    return (
        <div ref={containerRef} className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5">
            <h3
                className={`${headlineFont.variable} font-headline opacity-0 ${
                    isVisible && "animate-show-down-up"
                } motion-reduce:animate-none motion-reduce:opacity-100`}
            >
                {headline}
            </h3>
            <p
                className={`mt-4 text-justify opacity-0 [animation-delay:0.2s] ${
                    isVisible && "animate-show-down-up"
                } motion-reduce:animate-none motion-reduce:opacity-100 lg:text-lg`}
            >
                {desc}
            </p>
        </div>
    );
}
