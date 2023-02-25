import { menu } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import { MenuProps } from "@/public/types";
import Link from "next/link";

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
    const { icons, links } = menu;
    return (
        <div className="fixed w-full h-screen top-0 pt-32 bg-zinc-50 z-10 px-12">
            <div className="flex items-center">
                <div className="w-24 h-1 bg-blue-200"></div>
                <ul className="flex flex-row">
                    {icons.map((icon) => (
                        <li
                            key={icon.key}
                            className="mx-6 text-xl sm:text-2xl lg:text-3xl"
                        >
                            <a href={icon.href}>
                                <icon.icon />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <ul className="w-full sm:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
                {links.map((link) => (
                    <li
                        key={link.text}
                        className="flex flex-col items-start justify-between my-16 sm:flex-row sm:items-end"
                    >
                        <a
                            href={link.href}
                            onClick={() => setIsOpen(!isOpen)}
                            className={`text-xl sm:text-3xl lg:text-6xl ${lilitaOne.variable} font-lilita-one`}
                        >
                            {link.text}
                        </a>
                        <p className="text-sm sm:text-base lg:text-lg">
                            {link.desc}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
