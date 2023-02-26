import { lilitaOne } from "@/public/fonts";
import { ProjectDetailsProps } from "@/public/types";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";

export default function ProjectDetails({
    isOpen,
    setIsOpen,
    name,
    longDesc,
    image,
    links,
}: ProjectDetailsProps) {
    return (
        <div className="fixed w-full flex justify-center items-center h-screen top-0 left-0 bg-zinc-800 bg-opacity-90 z-40">
            <div className="basis-full mx-4 p-6 bg-zinc-50 rounded-lg shadow-lg shadow-zinc-800 max-w-sm lg:max-w-3xl lg:basis-3/5 lg:mx-0">
                <div className="flex justify-between items-center">
                    <h3
                        className={`text-lg ${lilitaOne.variable} font-lilita-one sm:text-xl md:text-2xl lg:text-3xl`}
                    >
                        {name}
                    </h3>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-xl sm:text-2xl lg:text-3xl"
                    >
                        <AiFillCloseCircle />
                    </button>
                </div>
                <div className="flex flex-col mt-5 lg:flex-row">
                    <div className="basis-1/2">
                        <p className="text-justify text-sm leading-relaxed sm:text-base lg:lg:mr-2">
                            {longDesc}
                        </p>
                    </div>
                    <div className="basis-1/2 mx-auto mt-4 lg:mt-1.5 lg:ml-2">
                        <Image
                            src={image}
                            alt="pizza"
                            className="rounded-lg h-24 object-cover min-[400px]:h-full"
                        />
                    </div>
                </div>
                <div className="w-full mt-6 flex justify-between items-center">
                    {links.map((link) => (
                        <a
                            key={link.text}
                            href={link.href}
                            className={`text-sm px-4 py-2 rounded-lg bg-blue-200 ${lilitaOne.variable} font-lilita-one sm:text-base`}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
