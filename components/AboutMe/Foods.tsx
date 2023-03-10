"use client";

import useElementOnScreen from "@/public/hooks/useElementOnScreen";
import { FoodsProps } from "@/public/types";
import Image from "next/image";
import Food from "./Food";

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
                <Food key={food.name} food={food} delay={delays[index]} />
            ))}
        </div>
    );
}
