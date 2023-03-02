import { menu } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import { MenuProps } from "@/public/types";

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
    const { icons, links } = menu;

    const iconsDelays = [
        "[animation-delay:1.0s]",
        "[animation-delay:1.1s]",
        "[animation-delay:1.2s]",
    ];

    const linksDelays = [
        "[animation-delay:1.5s]",
        "[animation-delay:1.8s]",
        "[animation-delay:2.1s]",
        "[animation-delay:2.4s]",
    ];

    return (
        <div className="fixed w-full h-screen top-0 pt-16 bg-zinc-50 z-10 px-12 animate-show-menu-mobile motion-reduce:animate-none lg:pt-32 lg:animate-show-menu-desktop lg:motion-reduce:animate-none">
            <div className="flex items-center">
                <div className="w-24 h-1 bg-blue-200 animate-slide-in-bar [animation-delay:0.9s] motion-reduce:animate-none"></div>
                <ul className="flex flex-row">
                    {icons.map((icon, index) => (
                        <li
                            key={icon.key}
                            className={`mx-6 text-xl sm:text-2xl lg:text-3xl animate-slide-in-right ${iconsDelays[index]} motion-reduce:animate-none`}
                        >
                            <a href={icon.href}>
                                <icon.icon />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <ul className="w-full sm:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
                {links.map((link, index) => (
                    <li
                        key={link.text}
                        className={`flex flex-col items-start justify-between my-16 animate-show ${linksDelays[index]} motion-reduce:animate-none sm:flex-row sm:items-end`}
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
