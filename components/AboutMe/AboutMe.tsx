import { aboutMe } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import Image from "next/image";

export default function AboutMe() {
    const { h2, h3, firstParagraph, secondParagraph, foods } = aboutMe;

    return (
        <section className="w-full px-4 lg:px-12 lg:pt-2 lg:pb-6">
            <div className="w-full flex flex-col max-w-7xl mx-auto items-center">
                <div>
                    <div className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5">
                        <h2
                            className={`text-xl ${lilitaOne.variable} font-lilita-one sm:text-2xl md:text-3xl lg:text-5xl`}
                        >
                            {h2}
                        </h2>
                        <p className="text-sm mt-4 text-justify leading-relaxed sm:text-base lg:text-lg">
                            {firstParagraph}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-16">
                    <div>
                        <div className="sm:w-4/5 md:w-3/5 xl:w-2/5">
                            <h3
                                className={`text-lg ${lilitaOne.variable} font-lilita-one sm:text-xl md:text-2xl lg:text-4xl`}
                            >
                                {h3}
                            </h3>
                            <p className="text-sm mt-4 text-justify leading-relaxed sm:text-base lg:text-lg">
                                {secondParagraph}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between mt-4 lg:flex-row">
                        {foods.map((food) => (
                            <div
                                key={food.alt}
                                className="basis-72 max-w-sm mx-auto mt-4 first:my-0 lg:my-0"
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
                </div>
            </div>
        </section>
    );
}
