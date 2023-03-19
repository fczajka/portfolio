import { landing } from "@/public/content";
import SectionWrapper from "../UI/SectionWrapper";
import Scroll from "./Scroll";
import TextAndImage from "./TextAndImage";

export default function Header() {
    const { h1, paragraph, image, letters } = landing;

    return (
        <SectionWrapper id="landing" uniqueStyle="h-screen relative">
            <TextAndImage h1={h1} paragraph={paragraph} image={image} />
            <Scroll letters={letters} />
        </SectionWrapper>
    );
}
