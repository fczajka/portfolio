import Image from "next/image";
import { ImagesProps } from "@/public/types";

export default function Images({ images, currentIndex }: ImagesProps) {
    return (
        <div
            className="flex transition-all duration-300 w-full"
            style={{
                transform: `translate(-${currentIndex * 100}%, 0%)`,
            }}
        >
            {images.map((image) => (
                <Image
                    key={image.alt}
                    src={image.image}
                    alt={image.alt}
                    className="rounded-xl object-cover w-full"
                />
            ))}
        </div>
    );
}
