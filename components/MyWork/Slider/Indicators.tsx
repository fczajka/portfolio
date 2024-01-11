import { IndicatorsProps } from "@/public/types";
import { BsDot } from "react-icons/bs";

export default function Indicators({ indexes, currentIndex }: IndicatorsProps) {
  return (
    <div className="absolute w-full bottom-1">
      <ul className="flex justify-center text-3xl dark:text-zinc-900">
        {indexes.map((index) => (
          <li
            key={index}
            className={`transition-all ${
              currentIndex === index ? "opacity-100 scale-125" : "opacity-60"
            }`}
          >
            {<BsDot />}
          </li>
        ))}
      </ul>
    </div>
  );
}
