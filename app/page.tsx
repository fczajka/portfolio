import Header from "@/components/Header/Header";
import Landing from "@/components/Landing/Landing";
import Separator from "@/components/Landing/Separator";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import { sourceSansPro } from "@/public/fonts";

export default function Home() {
    return (
        <main
            className={`bg-zinc-50 ${sourceSansPro.variable} font-source-sans-pro`}
        >
            <Header />
            <Landing />
            <Separator />
            <MobileNavbar />
        </main>
    );
}
