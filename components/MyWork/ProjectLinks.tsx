import Button from "../UI/Button";

type ProjectLinksProps = {
  links: {
    text: string;
    href: string;
    disabled?: boolean;
  }[];
};

export default function ProjectLinks({ links }: ProjectLinksProps) {
  const primaryLinks = links.slice(0, -1);
  const secondaryLink = links[links.length - 1];

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
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
      {secondaryLink && (
        <Button
          text={secondaryLink.text}
          href={secondaryLink.href}
          type="link"
          disabled={secondaryLink.disabled}
        />
      )}
    </div>
  );
}
