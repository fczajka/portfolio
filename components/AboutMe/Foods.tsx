"use client";

import { useState } from "react";
import { getStaticImageKey } from "@/helpers/helpers";
import type { FoodsProps } from "@/types";
import Food from "./Food";
import FoodDetailsModal from "./FoodDetailsModal";
import { delays } from "./constants";

export default function Foods({ foods }: FoodsProps) {
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const selectedFood = foods.find((item) => item.id === selectedFoodId) ?? null;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
        {foods.map((food, index) => (
          <Food
            key={getStaticImageKey(food.image, food.name)}
            food={food}
            delay={delays[index % delays.length]}
            onOpen={(item) => setSelectedFoodId(item.id)}
          />
        ))}
      </div>
      {selectedFood && (
        <FoodDetailsModal
          key={selectedFood.id}
          food={selectedFood}
          isOpen
          onClose={() => setSelectedFoodId(null)}
        />
      )}
    </>
  );
}
