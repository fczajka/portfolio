"use client";

import useElementOnScreen from "@/hooks/useElementOnScreen";
import { FoodProps } from "@/public/types";
import Image from "next/image";

export default function Food({ food, delay }: FoodProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
    });

    return (
        <div
            ref={containerRef}
            key={food.alt}
            className={`basis-72 max-w-sm mx-auto mt-4 opacity-0 ${
                isVisible ? "animate-show-down-up" : ""
            } ${delay} motion-reduce:animate-none motion-reduce:opacity-100 first:my-0 lg:my-2 lg:first:my-2 lg:first:ml-0 lg:last:mr-0 lg:basis-1/3 lg:max-w-[300px] xl:max-w-[340px]`}
        >
            <Image src={food.image} alt={food.alt} className="rounded-xl" />
            <h4>{food.name}</h4>
        </div>
    );
}
