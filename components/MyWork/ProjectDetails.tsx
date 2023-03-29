import { lilitaOne } from "@/public/fonts";
import { ProjectDetailsProps } from "@/public/types";
import { AiFillCloseCircle } from "react-icons/ai";
import Slider from "./Slider/Slider";

export default function ProjectDetails({
    isOpen,
    setIsOpen,
    name,
    longDesc,
    images,
    links,
}: ProjectDetailsProps) {
    return (
        <div className="fixed w-full flex justify-center items-center h-screen top-0 left-0 bg-zinc-800 bg-opacity-90 z-40 animate-fade-in motion-reduce:animate-none">
            <div className="basis-full mx-4 p-4 bg-zinc-50 rounded-xl shadow-lg shadow-zinc-800 max-w-sm animate-show-project-details motion-reduce:animate-none sm:p-6 lg:max-w-3xl lg:basis-3/5 lg:mx-0">
                <div className="flex justify-between items-center">
                    <h3
                        className={`${lilitaOne.variable} font-lilita-one animate-slide-in-left [animation-delay:0.5s] motion-reduce:animate-none`}
                    >
                        {name}
                    </h3>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-xl rounded-full animate-slide-in-right [animation-delay:0.5s] motion-reduce:animate-none sm:text-2xl lg:text-3xl"
                    >
                        <AiFillCloseCircle />
                    </button>
                </div>
                <div className="flex flex-col my-4 lg:flex-row sm:my-6">
                    <div className="basis-1/2">
                        <p className="text-justify animate-fade-in [animation-delay:1s] motion-reduce:animate-none lg:mr-3">
                            {longDesc}
                        </p>
                    </div>
                    <div className="basis-1/2 mx-auto mt-4 lg:mt-0 lg:ml-3">
                        <Slider images={images} />
                    </div>
                </div>
                <div className="w-full flex justify-between items-center">
                    {links.map((link) => (
                        <a
                            key={link.text}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm px-4 py-2 rounded-full bg-blue-200 ${lilitaOne.variable} font-lilita-one transition-all hover:shadow-custom hover:bg-blue-300 focus:bg-blue-300 motion-reduce:transition-none sm:text-base`}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
