import { FoodsProps } from "@/public/types";
import Food from "./Food";

export default function Foods({ foods }: FoodsProps) {
    const delays = [
        "[animation-delay:0.2s]",
        "[animation-delay:0.4s]",
        "[animation-delay:0.6s]",
    ];

    return (
        <div className="flex flex-col justify-between mt-4 lg:flex-row">
            {foods.map((food, index) => (
                <Food key={food.name} food={food} delay={delays[index]} />
            ))}
        </div>
    );
}
