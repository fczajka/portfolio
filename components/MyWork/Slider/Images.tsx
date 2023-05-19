import Image from "next/image";
import { ImagesProps } from "@/public/types";

export default function Images({ images, currentIndex }: ImagesProps) {
    return (
        <div
            className="relative w-[300%] h-full flex transition-all duration-300 motion-reduce:transition-none"
            style={{
                transform: `translate(-${(currentIndex * 100) / 3}%, 0%)`,
            }}
        >
            {images.map((image) => (
                <div key={image.alt} className="relative w-full h-full">
                    <Image
                        src={image.image}
                        alt={image.alt}
                        className="object-cover w-full h-full object-top"
                        placeholder="blur"
                        fill
                        sizes="(max-width: 360px) 360px,
                                400px"
                    />
                </div>
            ))}
        </div>
    );
}
