import type { IndicatorsProps } from "@/types";
import { BsDot } from "react-icons/bs";

export default function Indicators({
  indexes,
  currentIndex,
  setCurrentIndex,
}: IndicatorsProps) {
  return (
    <div className="w-full pt-1">
      <ul className="flex justify-center text-3xl text-zinc-900 dark:text-zinc-200">
        {indexes.map((index) => {
          const isCurrent = currentIndex === index;
          return (
            <li key={`indicator-${index}`}>
              <button
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`View screenshot ${index + 1}`}
                aria-current={isCurrent ? "true" : undefined}
                className={`flex items-center justify-center rounded-full transition-transform motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  isCurrent
                    ? "opacity-100 scale-125"
                    : "opacity-40 hover:opacity-75"
                }`}
              >
                <BsDot aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
