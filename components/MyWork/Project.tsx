"use client";

import { useState } from "react";
import { headlineFont } from "@/public/fonts";
import { ProjectProps } from "@/public/types";
import ProjectDetails from "./ProjectDetails";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import Button from "../UI/Button";

export default function Project({
    name,
    shortDesc,
    longDesc,
    images,
    links,
    animationDelay,
    buttonInfo,
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
                className={`flex flex-col basis-1/3 max-w-sm mx-auto my-4 p-4 shadow-custom shadow-zinc-400 rounded-primary opacity-0 transition-all hover:scale-105 hover:opacity-100 hover:[animation-fill-mode:backwards] ${
                    isVisible && "animate-show-down-up"
                } ${animationDelay} motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none sm:p-6 lg:m-0 lg:first:m-0 lg:last:m-0 lg:max-w-[300px] xl:max-w-[340px]`}
            >
                <div className="basis-3/4">
                    <h3 className={`${headlineFont.variable} font-headline`}>
                        {name}
                    </h3>
                    <p className="text-justify my-4">{shortDesc}</p>
                </div>
                <div className="basis-1/4 flex justify-end items-end">
                    <Button
                        text={buttonInfo.text}
                        callback={() => setIsOpen(!isOpen)}
                        aria={`Check details of ${name}`}
                        type={buttonInfo.type}
                    />
                </div>
            </div>
            {isOpen && (
                <ProjectDetails
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    name={name}
                    longDesc={longDesc}
                    images={images}
                    links={links}
                />
            )}
        </>
    );
}
