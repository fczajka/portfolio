import { aboutMe } from "@/public/content";
import Panel from "../UI/Panel";
import Foods from "./Foods";
import SubPanel from "./SubPanel";

export default function AboutMe() {
    const { h2, h3, firstParagraph, secondParagraph, foods } = aboutMe;

    return (
        <section id="about-me">
            <div className="max-w-section mx-auto">
                <Panel headline={h2} desc={firstParagraph} />
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col mt-8 lg:mt-16">
                        <SubPanel headline={h3} desc={secondParagraph} />
                        <Foods foods={foods} />
                    </div>
                </div>
            </div>
        </section>
    );
}
