import { landing } from "@/data/content";
import Scroll from "./Scroll";
import TextAndImage from "./TextAndImage";

export default function Landing() {
  const { h1, paragraph, ctas } = landing;

  return (
    <section
      id="landing"
      className="min-h-dvh relative pt-4 pb-14 min-[400px]:pb-18 sm:pt-6 sm:pb-20 flex flex-col lg:h-dvh lg:block lg:pt-0 lg:pb-0"
    >
      <TextAndImage h1={h1} paragraph={paragraph} ctas={ctas} />
      <Scroll />
    </section>
  );
}
