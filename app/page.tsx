import AboutMe from "@/components/AboutMe/AboutMe";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Landing from "@/components/Landing/Landing";
import Separator from "@/components/Landing/Separator";
import MyWork from "@/components/MyWork/MyWork";
import BackgroundParticles from "@/components/UI/BackgroundParticles";
import { defaultFont } from "@/lib/fonts";

export default function Home() {
  return (
    <main className={`${defaultFont.variable} font-default`}>
      <BackgroundParticles />
      <div className="relative max-w-1920 mx-auto">
        <Landing />
        <Separator />
        <MyWork />
        <AboutMe />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
