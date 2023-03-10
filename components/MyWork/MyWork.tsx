import { myWork } from "@/public/content";
import Panel from "../UI/Panel";
import Project from "./Project";

export default function MyWork() {
    const { h2, desc, projects } = myWork;

    return (
        <section
            id="my-work"
            className="w-full my-16 px-4 lg:my-0 lg:pt-20 lg:px-12"
        >
            <div className="mx-auto max-w-7xl">
                <Panel headline={h2} desc={desc} />
                <div className="w-full flex flex-col items-strech my-16 lg:mt-20 lg:flex-row lg:justify-between">
                    {projects.map((project, index) => (
                        <Project
                            key={project.name}
                            name={project.name}
                            shortDesc={project.shortDesc}
                            longDesc={project.longDesc}
                            image={project.image}
                            links={project.links}
                            animationDelay={`[animation-delay:0.${index * 2}s]`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
