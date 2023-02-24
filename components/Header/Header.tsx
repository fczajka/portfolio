import Link from "next/link";
import { lilitaOne } from "@/public/fonts";
import { header } from "@/public/content";

export default function Header() {
    const { menu, links } = header;
    return (
        <header className="fixed hidden w-full h-16 bg-zinc-50 shadow-md shadow-zinc-200 z-20 lg:flex">
            <div className="flex basis-1/2 pl-12 items-center h-full">
                <button
                    className={`text-xl ${lilitaOne.variable} font-lilita-one tracking-wider`}
                >
                    {menu}
                </button>
            </div>
            <nav className="basis-1/2">
                <ul className="flex items-center h-full">
                    {links.map((link) => (
                        <li key={link.text} className="basis-1/4 text-center">
                            <Link href={link.href}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
