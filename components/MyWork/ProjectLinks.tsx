import type { ProjectLink } from "@/types";
import Button from "../UI/Button";

type ProjectLinksProps = {
  links: ProjectLink[];
};

export default function ProjectLinks({ links }: ProjectLinksProps) {
  const primaryLinks = links.filter((link) => link.role !== "secondary");
  const secondaryLinks = links.filter((link) => link.role === "secondary");

  return (
    <div className="flex flex-wrap justify-between items-center gap-3">
      <div className="flex flex-wrap gap-3">
        {primaryLinks.map((link) => (
          <Button
            key={link.text}
            text={link.text}
            href={link.href}
            type="link"
            disabled={link.disabled}
          />
        ))}
      </div>
      {secondaryLinks.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {secondaryLinks.map((link) => (
            <Button
              key={link.text}
              text={link.text}
              href={link.href}
              type="link"
              disabled={link.disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}
