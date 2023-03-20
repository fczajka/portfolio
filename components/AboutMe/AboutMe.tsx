import { aboutMe } from "@/public/content";
import Panel from "../UI/Panel";
import Foods from "./Foods";
import SubPanel from "./SubPanel";

export default function AboutMe() {
    const { h2, h3, firstParagraph, secondParagraph, foods } = aboutMe;

    return (
        <section id="about-me">
            <div className="w-full flex flex-col max-w-section mx-auto items-center">
                <div>
                    <Panel headline={h2} desc={firstParagraph} />
                </div>
                <div className="w-full flex flex-col mt-16">
                    <div>
                        <SubPanel headline={h3} desc={secondParagraph} />
                    </div>
                    <Foods foods={foods} />
                </div>
            </div>
        </section>
    );
}
