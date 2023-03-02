"use client";

import { useState } from "react";
import { lilitaOne } from "@/public/fonts";
import { ProjectProps } from "@/public/types";
import ProjectDetails from "./ProjectDetails";

export default function Project({
    name,
    shortDesc,
    longDesc,
    image,
    links,
}: ProjectProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="relative basis-1/3 max-w-sm mx-auto my-6 px-6 py-6 shadow-lg shadow-zinc-200 rounded-lg lg:m-0 lg:max-w-[300px] xl:max-w-[340px] hover:scale-105 transition-all motion-reduce:transition-none">
                <h3
                    className={`text-lg ${lilitaOne.variable} font-lilita-one sm:text-xl md:text-2xl lg:text-3xl`}
                >
                    {name}
                </h3>
                <p className="text-justify text-sm my-4 mb-12 leading-relaxed sm:text-base">
                    {shortDesc}
                </p>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={`Check details of ${name}`}
                    className={`absolute right-6 bottom-4 bg-blue-200 text-right px-4 py-2 rounded-lg ${lilitaOne.variable} font-lilita-one hover:animate-button-background hover:motion-reduce:animate-none hover:motion-reduce:[boxShadow:4px_6px_#e4e4e7]`}
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
                    image={image}
                    links={links}
                />
            ) : (
                ""
            )}
        </>
    );
}
