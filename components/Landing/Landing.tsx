import { landing } from "@/public/content";
import Scroll from "./Scroll";
import TextAndImage from "./TextAndImage";

export default function Landing() {
  const { h1, paragraph, image, imageDark, letters } = landing;

  return (
    <section id="landing" className="h-screen relative pt-0">
      <TextAndImage
        h1={h1}
        paragraph={paragraph}
        image={image}
        imageDark={imageDark}
      />
      <Scroll letters={letters} />
    </section>
  );
}
