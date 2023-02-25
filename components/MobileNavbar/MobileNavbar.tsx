import { mobileNavbar } from "@/public/content";

export default function MobileNavbar() {
    return (
        <nav className="fixed w-full bottom-0 bg-zinc-50 h-12 shadow-mobile-navbar min-[420px]:h-16 lg:hidden">
            <ul className="flex h-full">
                {mobileNavbar.map((link) => (
                    <li
                        key={link.text}
                        className="basis-1/5 flex justify-center items-center"
                    >
                        <a
                            href={link.href}
                            className="flex flex-col items-center text-xs min-[420px]:text-sm"
                        >
                            <link.icon />
                            {link.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
