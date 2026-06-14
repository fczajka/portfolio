import { useState, useEffect } from "react";
import { SliderProps } from "@/public/types";
import Images from "./Images";
import Buttons from "./Buttons";
import Indicators from "./Indicators";

export default function Slider({ images, imagesInFormat }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexes = Array.from(Array(images.length).keys());

  useEffect(() => {
    if (currentIndex === -1) {
      setCurrentIndex(images.length - 1);
    }
    if (currentIndex === images.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, images.length]);

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={`flex-1 min-h-0 rounded-[1.25rem] shadow-custom shadow-zinc-400 overflow-x-hidden animate-fade-in touch-none dark:shadow-none [animation-delay:0.8s] motion-reduce:animate-none ${
          imagesInFormat === "3:4"
            ? "lg:flex-none lg:aspect-[3/4]"
            : "lg:flex-none lg:aspect-square"
        }`}
      >
        <div className="relative w-full h-full">
          <Images
            images={images}
            currentIndex={currentIndex}
            imagesInFormat={imagesInFormat}
          />
        </div>
      </div>
      <div className="relative flex justify-center p-2 animate-fade-in [animation-delay:1.1s] motion-reduce:animate-none lg:p-4">
        <Buttons
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Indicators indexes={indexes} currentIndex={currentIndex} />
      </div>
    </div>
  );
}
