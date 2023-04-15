import { headlineFont } from "@/public/fonts";
import { ProjectDetailsProps } from "@/public/types";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../UI/Button";
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center p-4 bg-zinc-800 bg-opacity-90 z-40 animate-fade-in touch-none motion-reduce:animate-none">
            <div className="basis-full h-full bg-zinc-50 p-4 flex flex-col rounded-xl shadow-lg shadow-zinc-800 max-w-sm max-h-1.5xl animate-show-project-details motion-reduce:animate-none sm:p-6 sm:max-h-3xl lg:h-min lg:max-w-3xl">
                <div className="flex justify-between">
                    <h3
                        className={`${headlineFont.variable} font-headline animate-slide-in-left [animation-delay:0.5s] motion-reduce:animate-none`}
                    >
                        {name}
                    </h3>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={`Close details of ${name}`}
                        className="text-xl rounded-full animate-slide-in-right [animation-delay:0.5s] motion-reduce:animate-none sm:text-3xl"
                    >
                        <AiFillCloseCircle />
                    </button>
                </div>
                <div className="flex flex-col items-stretch my-4 h-full lg:flex-row sm:my-6">
                    <div className="mb-2 sm:mb-3 lg:basis-1/2 lg:mb-0 lg:mr-3">
                        <p className="text-justify animate-fade-in [animation-delay:1s] motion-reduce:animate-none">
                            {longDesc}
                        </p>
                    </div>
                    <div className="mt-2 grow rounded-xl sm:mt-3 lg:basis-1/2 lg:mt-0 lg:ml-3 lg:h-88">
                        <Slider images={images} />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    {links.map((link) => (
                        <Button
                            key={link.text}
                            text={link.text}
                            type="link"
                            href={link.href}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
