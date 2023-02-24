import { myWork } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import Project from "./Project";

export default function MyWork() {
    const { h2, desc, projects } = myWork;

    return (
        <section className="w-full pt-16 px-4 lg:pt-16 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
                    <h2
                        className={`text-xl ${lilitaOne.variable} font-lilita-one sm:text-2xl md:text-3xl lg:text-5xl`}
                    >
                        {h2}
                    </h2>
                    <p className="text-sm mt-4 text-justify leading-relaxed sm:text-base lg:text-lg">
                        {desc}
                    </p>
                </div>
                <div className="w-full flex flex-col items-strech my-16 lg:mt-20 lg:flex-row lg:justify-between">
                    {projects.map((project) => (
                        <Project
                            key={project.name}
                            name={project.name}
                            desc={project.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
