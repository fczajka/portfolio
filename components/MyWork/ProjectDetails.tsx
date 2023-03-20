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
        <div className="fixed w-full flex justify-center items-center h-screen top-0 left-0 bg-zinc-800 bg-opacity-90 z-40 animate-fade-in motion-reduce:animate-none">
            <div className="basis-full mx-4 p-6 bg-zinc-50 rounded-lg shadow-lg shadow-zinc-800 max-w-sm animate-show-project-details motion-reduce:animate-none lg:max-w-3xl lg:basis-3/5 lg:mx-0">
                <div className="flex justify-between items-center">
                    <h3
                        className={`${lilitaOne.variable} font-lilita-one animate-slide-in-left [animation-delay:0.5s] motion-reduce:animate-none`}
                    >
                        {name}
                    </h3>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-xl animate-slide-in-right [animation-delay:0.5s] motion-reduce:animate-none sm:text-2xl lg:text-3xl"
                    >
                        <AiFillCloseCircle />
                    </button>
                </div>
                <div className="flex flex-col mt-5 lg:flex-row">
                    <div className="basis-1/2">
                        <p className="text-justify animate-fade-in [animation-delay:1s] motion-reduce:animate-none lg:lg:mr-2">
                            {longDesc}
                        </p>
                    </div>
                    <div className="basis-1/2 mx-auto mt-4 lg:mt-1.5 lg:ml-2">
                        <Image
                            src={image}
                            alt="pizza"
                            className="rounded-lg h-24 object-cover animate-fade-in [animation-delay:0.8s] motion-reduce:animate-none min-[400px]:h-full"
                        />
                    </div>
                </div>
                <div className="w-full mt-6 flex justify-between items-center">
                    {links.map((link) => (
                        <a
                            key={link.text}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm px-4 py-2 rounded-lg bg-blue-200 ${lilitaOne.variable} font-lilita-one hover:animate-button-background hover:motion-reduce:animate-none hover:motion-reduce:[boxShadow:4px_6px_#e4e4e7] sm:text-base`}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
