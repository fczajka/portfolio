import { IndicatorsProps } from "@/public/types";
import { BsDot } from "react-icons/bs";

export default function Indicators({ indexes, currentIndex }: IndicatorsProps) {
    return (
        <div className="absolute w-full bottom-1">
            <ul className="flex justify-center text-3xl">
                {indexes.map((index) => (
                    <li
                        key={index}
                        className={`${
                            currentIndex === index
                                ? "opacity-100"
                                : "opacity-60"
                        }`}
                    >
                        {<BsDot />}
                    </li>
                ))}
            </ul>
        </div>
    );
}