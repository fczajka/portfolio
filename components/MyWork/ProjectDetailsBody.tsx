import type { Dispatch, SetStateAction } from "react";
import type { ImageFormat, MyWorkPhotos } from "@/types";
import Slider from "./Slider/Slider";
import TechStackPills from "./TechStackPills";

type ProjectDetailsBodyProps = {
  name: string;
  longDesc: string;
  techStack: string[];
  images: MyWorkPhotos;
  imagesInFormat: ImageFormat;
  isLightboxOpen: boolean;
  onLightboxChange: Dispatch<SetStateAction<boolean>>;
};

/** Two-column body for ProjectDetails containing description, tech stack, and image slider. */
export default function ProjectDetailsBody({
  name,
  longDesc,
  techStack,
  images,
  imagesInFormat,
  isLightboxOpen,
  onLightboxChange,
}: ProjectDetailsBodyProps) {
  return (
    <div
      className={`my-4 flex flex-col items-stretch gap-4 sm:mt-6 sm:mb-2 lg:grid lg:gap-6 ${
        imagesInFormat === "3:4"
          ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
          : "lg:grid-cols-2"
      }`}
    >
      <div className="min-w-0">
        <p className="text-justify animate-fade-in [animation-delay:1s] motion-reduce:animate-none">
          {longDesc}
        </p>
        <TechStackPills techStack={techStack} />
      </div>
      <div className="min-w-0 rounded-primary">
        <Slider
          images={images}
          imagesInFormat={imagesInFormat}
          projectName={name}
          isLightboxOpen={isLightboxOpen}
          onLightboxChange={onLightboxChange}
        />
      </div>
    </div>
  );
}
