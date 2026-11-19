import type { MobileNavbarLinkProps } from "@/types";

export default function Link({
  text,
  href,
  icon: Icon,
  onClick,
}: MobileNavbarLinkProps) {
  return (
    <li className="basis-1/5 flex justify-center items-center">
      <a
        href={href}
        onClick={onClick}
        className="flex h-full w-full flex-col justify-center items-center text-xs min-[400px]:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
      >
        <Icon aria-hidden="true" />
        <span>{text}</span>
      </a>
    </li>
  );
}
