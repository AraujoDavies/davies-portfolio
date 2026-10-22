import { links } from "../content";
import { socialIcons } from "./SocialIcons";

const items = [
  { label: "LinkedIn" as const, href: links.linkedin },
  { label: "E-mail" as const, href: links.email },
];

export function Contact() {
  return (
    <section className="section section--contact" id="contato">
      <div className="section__intro">
        <p className="section__eyebrow">Contato</p>
        <h2 className="section__title">Vamos conversar?</h2>
        <p className="section__lead">
          Aberto a oportunidades como Backend Engineer com Python e AWS.
        </p>
      </div>
      <div className="contact__actions">
        {items.map((item) => {
          const Icon = socialIcons[item.label];
          return (
            <a
              key={item.label}
              className="btn btn--lg"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
              {item.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
