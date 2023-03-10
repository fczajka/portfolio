import { landing } from "@/public/content";
import Scroll from "./Scroll";
import TextAndImage from "./TextAndImage";

export default function Header() {
    const { h1, paragraph, image, letters } = landing;

    return (
        <section className="w-full h-screen relative pt-4 px-4  lg:pt-0 lg:px-12">
            <TextAndImage h1={h1} paragraph={paragraph} image={image} />
            <Scroll letters={letters} />
        </section>
    );
}
