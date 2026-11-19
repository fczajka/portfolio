import AboutMe from "@/components/AboutMe/AboutMe";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Landing from "@/components/Landing/Landing";
import Separator from "@/components/Landing/Separator";
import MyWork from "@/components/MyWork/MyWork";
import BackgroundParticles from "@/components/UI/BackgroundParticles";
import JsonLd from "@/components/UI/JsonLd";
import { getSiteStructuredData } from "@/lib/metadata";
import type { Locale } from "@/types";

type HomePageProps = {
  locale: Locale;
};

/** Shared portfolio home page rendered by `/` (EN) and `/pl` (PL) with localized JSON-LD. */
export default function HomePage({ locale }: HomePageProps) {
  return (
    <main>
      <JsonLd data={getSiteStructuredData(locale)} />
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
