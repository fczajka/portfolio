"use client";

import { mobileNavbar } from "@/public/content";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Menu from "../UI/Menu";

export default function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { links, buttons } = mobileNavbar;

    const buttonsStyles = [
        `absolute ${isOpen ? "translate-y-10" : "translate-y-0"}`,
        `${isOpen ? "translate-y-0" : "translate-y-10"}`,
    ];

    return (
        <>
            <nav className="fixed w-full bottom-0 bg-zinc-50 h-12 z-30 min-[400px]:h-16 lg:hidden">
                <ul className="flex h-full">
                    {links.map((link) => (
                        <li
                            key={link.text}
                            className="basis-1/4 flex justify-center items-center"
                        >
                            <a
                                href={link.href}
                                className="flex flex-col items-center text-xs min-[400px]:text-sm"
                            >
                                <link.icon />
                                {link.text}
                            </a>
                        </li>
                    ))}
                    <li className="basis-1/5">
                        <div className="flex h-full flex-col justify-center items-center text-xs min-[400px]:text-sm">
                            <HiMenuAlt3 />
                            <div className="overflow-y-hidden flex flex-col">
                                {buttons.map((button, index) => (
                                    <button
                                        key={button.text}
                                        onClick={() => setIsOpen(!isOpen)}
                                        aria-label={button.aria}
                                        type="button"
                                        className={`transition-all ${buttonsStyles[index]}`}
                                    >
                                        {button.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            {isOpen ? <Menu isOpen={isOpen} setIsOpen={setIsOpen} /> : ""}
        </>
    );
}
