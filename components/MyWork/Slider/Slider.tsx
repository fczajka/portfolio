import { useState, useEffect } from "react";
import { SliderProps } from "@/public/types";
import Images from "./Images";
import Buttons from "./Buttons";
import Indicators from "./Indicators";

export default function Slider({ images }: SliderProps) {
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
    <div className="w-full h-full rounded-primary shadow-custom shadow-zinc-400 overflow-x-hidden animate-fade-in touch-none [animation-delay:0.8s] motion-reduce:animate-none">
      <div className="relative w-full h-full">
        <Images images={images} currentIndex={currentIndex} />
        <Buttons
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Indicators indexes={indexes} currentIndex={currentIndex} />
      </div>
    </div>
  );
}
