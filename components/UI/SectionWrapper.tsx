import { SectionWrapperProps } from "@/public/types";

export default function SectionWrapper({
    id,
    uniqueStyle,
    children,
}: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={`w-full px-4 py-16 lg:px-12 ${uniqueStyle}`}
        >
            {children}
        </section>
    );
}
