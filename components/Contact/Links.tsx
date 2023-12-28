import useElementOnScreen from "@/hooks/useElementOnScreen";
import { LinksProps } from "@/public/types";
import Link from "./Link";

export default function Links({ links }: LinksProps) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  });

  const delays = [
    "[animation-delay:0.2s]",
    "[animation-delay:0.4s]",
    "[animation-delay:0.6s]",
  ];
  return (
    <div ref={containerRef} className="basis-full sm:px-32 md:px-44 lg:px-24">
      <ul>
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            icon={link.icon}
            type={link.type}
            delay={delays[index]}
            isVisible={isVisible}
          ></Link>
        ))}
      </ul>
    </div>
  );
}
