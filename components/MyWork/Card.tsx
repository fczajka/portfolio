"use client";

import { useState } from "react";
import Image from "next/image";
import { headlineFont } from "@/public/fonts";
import { ProjectProps } from "@/public/types";
import ProjectDetails from "./ProjectDetails";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import Button from "../UI/Button";

export default function Project({
  name,
  shortDesc,
  techStack,
  longDesc,
  images,
  links,
  animationDelay,
  buttonInfo,
  logo,
  imagesInFormat,
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
        className={`flex flex-col basis-1/3 max-w-sm mx-auto my-4 p-4 rounded-primary opacity-0 transition-all duration-300 bg-zinc-100 outline outline-1 outline-transparent hover:outline-primary-400 hover:scale-105 hover:opacity-100 hover:shadow-xl hover:shadow-primary-100/50 dark:hover:shadow-none hover:[animation-fill-mode:backwards] dark:bg-dark-secondary-bg dark:shadow-none ${
          isVisible && "animate-show-down-up"
        } ${animationDelay} motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none sm:p-6 lg:m-0 lg:first:m-0 lg:last:m-0 lg:max-w-[350px] xl:max-w-[380px]`}
      >
        <div className="basis-3/4 flex flex-col justify-start">
          <div className="flex justify-between items-center gap-4 w-full">
            <h3
              className={`${headlineFont.variable} font-headline text-2xl lg:text-3xl tracking-tight text-zinc-900 dark:text-zinc-100`}
            >
              {name}
            </h3>
            {logo && (
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  className="rounded-xl object-contain"
                />
              </div>
            )}
          </div>
          <p className="text-justify my-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {shortDesc}
          </p>
        </div>
        <div className="basis-1/4 flex justify-end items-end pt-2">
          <Button
            text={buttonInfo.text}
            callback={() => setIsOpen(!isOpen)}
            aria={`Check details of ${name}`}
            type={buttonInfo.type}
            style="dark:text-zinc-900"
          />
        </div>
      </div>
      {isOpen && (
        <ProjectDetails
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          name={name}
          longDesc={longDesc}
          techStack={techStack}
          images={images}
          links={links}
          imagesInFormat={imagesInFormat}
        />
      )}
    </>
  );
}
