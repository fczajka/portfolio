import useElementOnScreen from "@/hooks/useElementOnScreen";
import type { LinksProps } from "@/types";
import Link from "./Link";
import { delays } from "./constants";

export default function Links({ links }: LinksProps) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

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
