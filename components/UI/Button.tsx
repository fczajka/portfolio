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
            className={`${style} text-sm px-4 py-2 rounded-full bg-blue-200 ${headlineFont.variable} font-headline transition-all shadow-custom shadow-zinc-400 hover:bg-blue-300 focus:bg-blue-300 motion-reduce:transition-none sm:text-base`}
        >
            {text}
        </button>
    ) : (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${style} text-sm px-4 py-2 rounded-full bg-blue-200 ${headlineFont.variable} font-headline transition-all shadow-custom shadow-zinc-400 hover:bg-blue-300 focus:bg-blue-300 motion-reduce:transition-none sm:text-base`}
        >
            {text}
        </a>
    );
}
