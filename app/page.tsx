import Header from "@/components/Header/Header";
import { sourceSansPro } from "@/public/fonts";

export default function Home() {
    return (
        <main
            className={`bg-zinc-50 ${sourceSansPro.variable} font-source-sans-pro`}
        >
            <Header />
        </main>
    );
}
