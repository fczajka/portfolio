"use client";

import { useLocale } from "@/components/Providers/LocaleProvider";
import { getContent } from "@/data/content";
import Panel from "../UI/Panel";
import ExperienceTimeline from "./ExperienceTimeline";
import Foods from "./Foods";
import SubPanel from "./SubPanel";

export default function AboutMe() {
  const { locale } = useLocale();
  const { h2, h3, firstParagraph, secondParagraph, foods, experience } =
    getContent(locale).aboutMe;

  return (
    <section id="about-me">
      <div className="max-w-section mx-auto">
        <Panel headline={h2} desc={firstParagraph} />
        <ExperienceTimeline experience={experience} />
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col mt-16 lg:mt-24">
            <SubPanel headline={h3} desc={secondParagraph} />
            <Foods foods={foods} />
          </div>
        </div>
      </div>
    </section>
  );
}
