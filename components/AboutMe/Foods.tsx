"use client";

import useElementOnScreen from "@/public/hooks/useElementOnScreen";
import { FoodsProps } from "@/public/types";
import Image from "next/image";

export default function Foods({ foods }: FoodsProps) {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    });

    const delays = [
        "[animation-delay:0.2s]",
        "[animation-delay:0.4s]",
        "[animation-delay:0.6s]",
    ];

    return (
        <div
            ref={containerRef}
            className="flex flex-col justify-between mt-4 lg:flex-row"
        >
            {foods.map((food, index) => (
                <div
                    key={food.alt}
                    className={`basis-72 max-w-sm mx-auto mt-4 opacity-0 ${
                        isVisible ? "animate-show-down-up" : ""
                    } ${
                        delays[index]
                    } motion-reduce:animate-none motion-reduce:opacity-100 first:my-0 lg:my-2 lg:first:my-2 lg:first:ml-0 lg:last:mr-0 lg:basis-1/3 lg:max-w-[300px] xl:max-w-[340px]`}
                >
                    <Image
                        src={food.image}
                        alt={food.alt}
                        className="rounded-lg"
                    />
                    <h4 className="text-center text-sm lg:text-base">
                        {food.name}
                    </h4>
                </div>
            ))}
        </div>
    );
}
