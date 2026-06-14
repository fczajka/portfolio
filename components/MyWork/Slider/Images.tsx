import Image from "next/image";
import { ImagesProps } from "@/public/types";

export default function Images({
  images,
  currentIndex,
  imagesInFormat,
}: ImagesProps) {
  const imageCount = images.length;

  return (
    <div
      className="relative w-full h-full flex transition-all ease-out duration-300 motion-reduce:transition-none"
      style={{
        width: `${imageCount * 100}%`,
        transform: `translateX(-${(currentIndex * 100) / imageCount}%)`,
      }}
    >
      {images.map((image) => (
        <div
          key={image.alt}
          className="relative w-full h-full"
          style={{ flex: `0 0 ${100 / imageCount}%` }}
        >
          <Image
            src={image.image}
            alt={image.alt}
            className="object-cover w-full h-full object-top"
            placeholder="blur"
            fill
            sizes={
              imagesInFormat === "3:4"
                ? "(max-width: 640px) 80vw, 280px"
                : "(max-width: 640px) 90vw, 450px"
            }
          />
        </div>
      ))}
    </div>
  );
}
