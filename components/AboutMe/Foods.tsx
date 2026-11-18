import { getStaticImageKey } from "@/helpers/helpers";
import type { FoodsProps } from "@/types";
import Food from "./Food";
import { delays } from "./constants";

export default function Foods({ foods }: FoodsProps) {
  return (
    <div className="flex flex-col justify-between mt-4 lg:flex-row">
      {foods.map((food, index) => (
        <Food
          key={getStaticImageKey(food.image, food.name)}
          food={food}
          delay={delays[index]}
        />
      ))}
    </div>
  );
}
