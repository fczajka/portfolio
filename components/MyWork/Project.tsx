import { lilitaOne } from "@/public/fonts";
import { ProjectProps } from "@/public/types";

export default function Project({ name, desc }: ProjectProps) {
    return (
        <div className="relative basis-1/3 max-w-sm mx-auto my-6 px-6 py-6 shadow-lg shadow-zinc-200 rounded-lg lg:m-0 lg:max-w-[300px] xl:max-w-[340px]">
            <h3
                className={`text-lg ${lilitaOne.variable} font-lilita-one sm:text-xl md:text-2xl lg:text-4xl`}
            >
                {name}
            </h3>
            <p className="text-justify text-sm my-4 mb-12 leading-relaxed sm:text-base">
                {desc}
            </p>
            <button
                className={`absolute right-6 bottom-4 bg-blue-200 text-right px-4 py-2 rounded-lg ${lilitaOne.variable} font-lilita-one`}
            >
                Read more
            </button>
        </div>
    );
}
