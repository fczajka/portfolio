import { headlineFont } from "@/public/fonts";
import { ButtonProps } from "@/public/types";

export default function Button({
    text,
    callback,
    aria,
    type,
    href,
    style,
}: ButtonProps) {
    return type === "button" && callback ? (
        <button
            onClick={() => callback()}
            aria-label={aria}
            className={`${style} text-sm px-4 py-2 rounded-full bg-primary-200 ${headlineFont.variable} font-headline transition-all hover:bg-primary-300 focus:bg-primary-300 motion-reduce:transition-none sm:text-base`}
        >
            {text}
        </button>
    ) : (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${style} text-sm px-4 py-2 rounded-full bg-primary-200 ${headlineFont.variable} font-headline transition-all hover:bg-primary-300 focus:bg-primary-300 motion-reduce:transition-none sm:text-base`}
        >
            {text}
        </a>
    );
}
