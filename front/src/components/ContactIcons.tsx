import { links } from "../content";
import { IconEmail, IconGitHub, IconLinkedIn } from "./SocialIcons";

const items = [
  {
    label: "GitHub",
    href: links.github,
    Icon: IconGitHub,
  },
  {
    label: "LinkedIn",
    href: links.linkedin,
    Icon: IconLinkedIn,
  },
  {
    label: "E-mail",
    href: links.email,
    Icon: IconEmail,
  },
] as const;

type ContactIconsProps = {
  className?: string;
};

export function ContactIcons({ className = "contact-icons" }: ContactIconsProps) {
  return (
    <nav className={className} aria-label="Contato">
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon className="contact-icons__icon" />
        </a>
      ))}
    </nav>
  );
}
