import { MobileNavbarLinkProps } from "@/public/types";

export default function Link({
    text,
    href,
    icon: Icon,
}: MobileNavbarLinkProps) {
    return (
        <li className="basis-1/5 flex justify-center items-center">
            <a
                href={href}
                className="flex flex-col items-center text-xs min-[400px]:text-sm"
            >
                <Icon />
                {text}
            </a>
        </li>
    );
}
