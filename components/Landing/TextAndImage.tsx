"use client";

import { headlineFont } from "@/public/fonts";
import Image from "next/image";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import { TextAndImageProps } from "@/public/types";

export default function TextAndImage({
    h1,
    paragraph,
    image,
}: TextAndImageProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.85,
    });

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-col-reverse max-w-section mx-auto items-center lg:flex-row"
        >
            <div className="basis-2/5 lg:basis-1/2">
                <h1
                    className={`opacity-0 [animation-delay:0.1s] motion-reduce:animate-none motion-reduce:opacity-100 ${
                        headlineFont.variable
                    } font-headline ${isVisible ? "animate-show-down-up" : ""}`}
                >
                    {h1}
                </h1>
                <p
                    className={`hidden text-xl mt-4 opacity-0 [animation-delay:0.5s] motion-reduce:animate-none motion-reduce:opacity-100 ${
                        isVisible ? "animate-show-down-up" : ""
                    } lg:block`}
                >
                    {paragraph}
                </p>
            </div>
            <div className="basis-3/5 lg:basis-1/2 flex items-end max-w-md lg:max-w-xl lg:mx-auto">
                <Image
                    src={image}
                    alt="Hero image"
                    className={`opacity-0 [animation-delay:0.5s] lg:[animation-delay:0.9s] motion-reduce:animate-none motion-reduce:opacity-100 ${
                        isVisible ? "animate-photo" : ""
                    }`}
                    priority
                ></Image>
            </div>
        </div>
    );
}
