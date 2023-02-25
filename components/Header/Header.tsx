"use client";

import { useState } from "react";
import { lilitaOne } from "@/public/fonts";
import { header, menu } from "@/public/content";
import Menu from "../UI/Menu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { links } = header;
    const { buttons } = menu;

    const buttonsStyles = [
        `absolute ${isOpen ? "-translate-y-10" : "-translate-y-0"}`,
        `${isOpen ? "-translate-y-0" : "-translate-y-10"}`,
    ];

    return (
        <>
            <header className="fixed hidden w-full h-16 bg-zinc-50 shadow-md shadow-zinc-200 z-30 lg:flex lg:justify-between">
                <div className="flex basis-1/2 h-full pl-12 items-center overflow-y-hidden">
                    {buttons.map((button, index) => (
                        <button
                            key={button.text}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={button.aria}
                            type="button"
                            className={`text-xl ${lilitaOne.variable} font-lilita-one tracking-wider ${buttonsStyles[index]}`}
                        >
                            {button.text}
                        </button>
                    ))}
                </div>
                <nav className="basis-1/2 max-w-5xl">
                    <ul className="flex items-center h-full">
                        {links.map((link) => (
                            <li
                                key={link.text}
                                className="basis-1/4 text-center"
                            >
                                <a href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            {isOpen ? <Menu isOpen={isOpen} setIsOpen={setIsOpen} /> : ""}
        </>
    );
}
