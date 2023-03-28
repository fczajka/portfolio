"use client";

import { useState } from "react";
import { lilitaOne } from "@/public/fonts";
import { ProjectProps } from "@/public/types";
import ProjectDetails from "./ProjectDetails";
import useElementOnScreen from "@/public/hooks/useElementOnScreen";

export default function Project({
    name,
    shortDesc,
    longDesc,
    images,
    links,
    animationDelay,
}: ProjectProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
    });
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div
                ref={containerRef}
                className={`relative basis-1/3 max-w-sm mx-auto my-6 px-6 py-6 shadow-custom shadow-zinc-400 rounded-xl opacity-0 transition-all hover:scale-105 hover:opacity-100 hover:[animation-fill-mode:backwards] ${
                    isVisible ? "animate-show-down-up" : ""
                } ${animationDelay} motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none lg:m-0 lg:max-w-[300px] xl:max-w-[340px]`}
            >
                <h3 className={`${lilitaOne.variable} font-lilita-one`}>
                    {name}
                </h3>
                <p className="text-justify my-4 mb-16">{shortDesc}</p>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={`Check details of ${name}`}
                    className={`absolute right-6 bottom-6 bg-blue-200 text-right px-4 py-2 rounded-full ${lilitaOne.variable} font-lilita-one transition-all hover:shadow-custom hover:bg-blue-300 focus:bg-blue-300 motion-reduce:transition-none`}
                >
                    Read more
                </button>
            </div>
            {isOpen ? (
                <ProjectDetails
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    name={name}
                    longDesc={longDesc}
                    images={images}
                    links={links}
                />
            ) : (
                ""
            )}
        </>
    );
}
