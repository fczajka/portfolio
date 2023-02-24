import { myWork } from "@/public/content";
import { lilitaOne } from "@/public/fonts";

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
                        <div
                            key={project.name}
                            className="relative basis-1/3 max-w-sm mx-auto my-6 px-6 py-6 shadow-lg rounded-lg lg:my-0 lg:max-w-[300px] xl:max-w-[340px]"
                        >
                            <h3
                                className={`text-lg ${lilitaOne.variable} font-lilita-one sm:text-xl md:text-2xl lg:text-4xl`}
                            >
                                {project.name}
                            </h3>
                            <p className="text-justify text-sm my-4 mb-12 leading-relaxed sm:text-base">
                                {project.desc}
                            </p>
                            <button
                                className={`absolute right-6 bottom-4 bg-blue-200 text-right px-4 py-2 rounded-lg ${lilitaOne.variable} font-lilita-one`}
                            >
                                Read more
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
