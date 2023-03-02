import { lilitaOne } from "@/public/fonts";
import Image from "next/image";
import { landing } from "@/public/content";

export default function Header() {
    const { h1, paragraph, image, letters } = landing;

    const delays = [
        "[animation-delay:2.3s]",
        "[animation-delay:2.4s]",
        "[animation-delay:2.5s]",
        "[animation-delay:2.6s]",
        "[animation-delay:2.7s]",
        "[animation-delay:2.8s]",
    ];

    return (
        <section className="w-full h-screen relative pt-4 px-4 lg:pt-0 lg:px-12">
            <div className="w-full h-full flex flex-col-reverse max-w-7xl mx-auto items-center lg:flex-row">
                <div className="basis-2/5 lg:basis-1/2">
                    <h1
                        className={`text-3xl text-center tracking-wider ${lilitaOne.variable} font-lilita-one sm:text-4xl md:text-5xl lg:text-left lg:text-7xl`}
                    >
                        {h1}
                    </h1>
                    <p className="hidden text-xl mt-4 lg:block">{paragraph}</p>
                </div>
                <div className="basis-3/5 lg:basis-1/2 flex items-end max-w-md lg:max-w-xl lg:mx-auto">
                    <Image src={image} alt="Hero image"></Image>
                </div>
            </div>
            <div className="absolute flex flex-col items-center left-1/2 -translate-x-1/2 -bottom-12 sm:-bottom-16 md:-bottom-24 lg:left-1/4 lg:-translate-x-1/4 lg:-bottom-28">
                <div className="relative flex mb-4 tracking-wider text-sm md:text-base">
                    {letters.map((letter, index) => (
                        <span
                            key={index}
                            className={`animate-jump ${delays[index]} motion-reduce:animate-none`}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
                <div className="w-0.5 h-28 bg-zinc-200 min-[420px]:h-32 sm:h-40 md:h-60 lg:h-56"></div>
            </div>
        </section>
    );
}
