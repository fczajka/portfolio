import { menu } from "@/public/content";
import { headlineFont } from "@/public/fonts";
import { MenuProps } from "@/public/types";

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
    const { icons, links } = menu;

    const iconsDelays = [
        "[animation-delay:0.7s]",
        "[animation-delay:0.8s]",
        "[animation-delay:0.9s]",
    ];

    const linksDelays = [
        "[animation-delay:1.2s]",
        "[animation-delay:1.5s]",
        "[animation-delay:1.8s]",
        "[animation-delay:2.1s]",
    ];

    return (
        <div className="fixed w-full h-screen top-0 pt-16 bg-zinc-50 z-10 px-12 animate-show-menu-mobile touch-none motion-reduce:animate-none lg:pt-32 lg:animate-show-menu-desktop lg:motion-reduce:animate-none">
            <div className="flex items-center">
                <div className="w-24 h-1 bg-blue-200 animate-slide-in-bar [animation-delay:0.6s] motion-reduce:animate-none"></div>
                <ul className="flex flex-row">
                    {icons.map((icon, index) => (
                        <li
                            key={icon.key}
                            className={`mx-6 text-xl sm:text-2xl lg:text-3xl animate-slide-in-right ${iconsDelays[index]} motion-reduce:animate-none`}
                        >
                            {icon.type === "link" ? (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={icon.href}
                                >
                                    <icon.icon />
                                </a>
                            ) : (
                                <a href={`mailto:${icon.href}`}>
                                    <icon.icon />
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full h-full py-8 pb-24 lg:py-16">
                <ul className="w-full h-full flex flex-col justify-between max-h-96 sm:w-3/5 lg:w-1/2 lg:max-h-112 xl:w-2/5 2xl:w-1/3">
                    {links.map((link, index) => (
                        <li
                            key={link.text}
                            className={`flex flex-col items-start justify-between animate-show-up-down ${linksDelays[index]} motion-reduce:animate-none sm:flex-row sm:items-end`}
                        >
                            <a
                                href={link.href}
                                onClick={() => setIsOpen(!isOpen)}
                                className={`text-xl sm:text-3xl lg:text-6xl ${headlineFont.variable} font-headline`}
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
        </div>
    );
}
