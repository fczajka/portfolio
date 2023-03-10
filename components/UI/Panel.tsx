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
                className={`text-xl ${
                    lilitaOne.variable
                } font-lilita-one opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 ${
                    isVisible ? "animate-show-down-up" : ""
                } sm:text-2xl md:text-3xl lg:text-5xl`}
            >
                {headline}
            </h2>
            <p
                className={`text-sm mt-4 text-justify leading-relaxed opacity-0 ${
                    isVisible ? "animate-show-down-up" : ""
                } [animation-delay:0.2s] motion-reduce:animate-none motion-reduce:opacity-100 sm:text-base lg:text-lg`}
            >
                {desc}
            </p>
        </div>
    );
}
