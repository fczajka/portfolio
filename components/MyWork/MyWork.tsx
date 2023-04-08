import { myWork } from "@/public/content";
import Panel from "../UI/Panel";
import Project from "./Project";

export default function MyWork() {
    const { h2, desc, projects } = myWork;

    const delays = [
        "lg:[animation-delay:0.2s]",
        "lg:[animation-delay:0.4s]",
        "lg:[animation-delay:0.6s]",
    ];

    return (
        <section id="my-work">
            <div className="mx-auto max-w-section">
                <Panel headline={h2} desc={desc} />
                <div className="w-full flex flex-col items-strech mt-16 lg:mt-20 lg:flex-row lg:justify-between">
                    {projects.map((project, index) => (
                        <Project
                            key={project.name}
                            name={project.name}
                            shortDesc={project.shortDesc}
                            longDesc={project.longDesc}
                            images={project.images}
                            links={project.links}
                            animationDelay={delays[index]}
                            buttonInfo={project.buttonInfo}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
