import { myWork } from "@/public/content";
import Panel from "../UI/Panel";
import Project from "./Card";
import { delays } from "./constants";

export default function MyWork() {
  const { h2, desc, projects } = myWork;

  return (
    <section id="my-work">
      <div className="mx-auto max-w-section">
        <Panel headline={h2} desc={desc} />
        <div className="w-full flex flex-col items-stretch mt-8 lg:mt-20 lg:flex-row lg:justify-between gap-6">
          {projects.map((project, index) => (
            <Project
              key={project.name}
              name={project.name}
              shortDesc={project.shortDesc}
              techStack={project.techStack}
              longDesc={project.longDesc}
              images={project.images}
              links={project.links}
              animationDelay={delays[index]}
              buttonInfo={project.buttonInfo}
              logo={project.logo}
              imagesInFormat={project.imagesInFormat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
