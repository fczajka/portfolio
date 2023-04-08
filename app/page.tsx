import AboutMe from "@/components/AboutMe/AboutMe";
import Contact from "@/components/Contact/Contact";
import Landing from "@/components/Landing/Landing";
import Separator from "@/components/Landing/Separator";
import MyWork from "@/components/MyWork/MyWork";
import { sourceSansPro } from "@/public/fonts";

export default function Home() {
    return (
        <main className={`${sourceSansPro.variable} font-source-sans-pro`}>
            <div className="max-w-1920 mx-auto">
                <Landing />
                <Separator />
                <MyWork />
                <AboutMe />
                <Contact />
            </div>
        </main>
    );
}
