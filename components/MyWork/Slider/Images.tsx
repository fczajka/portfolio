import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import { useLocale } from "@/components/Providers/LocaleProvider";
import { getUiCopy } from "@/data/content";
import { getStaticImageKey } from "@/helpers/helpers";
import type { ImagesProps } from "@/types";

export default function Images({
  images,
  currentIndex,
  imagesInFormat,
  onExpand,
}: ImagesProps) {
  const { locale } = useLocale();
  const uiCopy = getUiCopy(locale).slider;
  const imageCount = images.length;

  return (
    <div
      className="relative w-full h-full flex transition-transform ease-out duration-300 motion-reduce:transition-none"
      style={{
        width: `${imageCount * 100}%`,
        transform: `translateX(-${(currentIndex * 100) / imageCount}%)`,
      }}
    >
      {images.map((image) => (
        <div
          key={getStaticImageKey(image.image, image.alt)}
          className="relative h-full"
          style={{ flex: `0 0 ${100 / imageCount}%` }}
        >
          <button
            type="button"
            onClick={onExpand}
            aria-label={uiCopy.expandAria(image.alt)}
            className="group relative block w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
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
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 rounded-full bg-zinc-900/75 p-2 text-zinc-50 opacity-75 backdrop-blur-xs transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <FiMaximize2 className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
