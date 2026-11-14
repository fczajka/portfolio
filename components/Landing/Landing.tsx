import { landing } from "@/data/content";
import Scroll from "./Scroll";
import TextAndImage from "./TextAndImage";

export default function Landing() {
  const { h1, paragraph, ctas } = landing;

  return (
    <section
      id="landing"
      className="min-h-screen relative pt-16 pb-28 sm:pb-32 flex flex-col justify-center lg:h-screen lg:block lg:pt-0 lg:pb-0"
    >
      <TextAndImage h1={h1} paragraph={paragraph} ctas={ctas} />
      <Scroll />
    </section>
  );
}
