import { lilitaOne } from "@/public/fonts";
import Image from "next/image";
import Hero from "@/public/images/hero.png";

export default function Header() {
    return (
        <section className="w-full h-screen pt-20 px-4 lg:pt-0 lg:px-12">
            <div className="w-full h-full flex flex-col-reverse max-w-7xl mx-auto items-center lg:flex-row">
                <div className="basis-full lg:basis-1/2">
                    <h1
                        className={`text-3xl text-center tracking-wider ${lilitaOne.variable} font-lilita-one sm:text-4xl md:text-5xl lg:text-left lg:text-7xl`}
                    >
                        Hi, my name is Franciszek!
                    </h1>
                    <p className="hidden text-xl mt-4 lg:block">
                        I am creative web developer from Poznań, Poland.
                    </p>
                </div>
                <div className="lg:basis-1/2 max-w-md lg:max-w-xl lg:mx-auto">
                    <Image src={Hero} alt="Hero image"></Image>
                </div>
            </div>
        </section>
    );
}
