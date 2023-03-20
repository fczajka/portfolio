"use client";

import { lilitaOne } from "@/public/fonts";
import useElementOnScreen from "@/public/hooks/useElementOnScreen";
import { PanelProps } from "@/public/types";

export default function Panel({ headline, desc }: PanelProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    });

    return (
        <div ref={containerRef} className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5">
            <h2
                className={`font-lilita-one opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 ${
                    lilitaOne.variable
                }  ${isVisible ? "animate-show-down-up" : ""}`}
            >
                {headline}
            </h2>
            <p
                className={`mt-4 text-justify opacity-0 ${
                    isVisible ? "animate-show-down-up" : ""
                } [animation-delay:0.2s] motion-reduce:animate-none motion-reduce:opacity-100 lg:text-lg`}
            >
                {desc}
            </p>
        </div>
    );
}
