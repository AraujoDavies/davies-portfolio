import type { ReactNode } from "react";
import type { ResumeData } from "./resume";
import "./resume.css";

type Props = {
  data: ResumeData;
};

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.19a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12 24 5.37 18.627 0 12 0z" />
    </svg>
  );
}

type ContactItemProps = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
};

function ContactItem({ label, icon, children }: ContactItemProps) {
  return (
    <div className="resume-contact-item">
      <span className="resume-contact-icon">{icon}</span>
      <div className="resume-contact-text">
        <span className="resume-contact-label">{label}</span>
        <span className="resume-contact-value">{children}</span>
      </div>
    </div>
  );
}

export function ResumeDocument({ data }: Props) {
  const { contact } = data;

  return (
    <article className="resume-sheet" aria-label={`Currículo — ${data.headline}`}>
      <header className="resume-header">
        <h1 className="resume-name">{data.name}</h1>
        <p className="resume-headline">{data.headline}</p>

        <div className="resume-contact-card">
          <ContactItem label="Localização" icon={<IconPin />}>
            {contact.location}
          </ContactItem>
          <ContactItem label="Telefone" icon={<IconPhone />}>
            <a href={`tel:+5511930628076`}>{contact.phone}</a>
          </ContactItem>
          <ContactItem label="E-mail" icon={<IconMail />}>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </ContactItem>
          <ContactItem label="Portfólio" icon={<IconGlobe />}>
            <a href={contact.portfolioUrl} rel="noopener noreferrer">
              {contact.portfolio}
            </a>
          </ContactItem>
          <ContactItem label="LinkedIn" icon={<IconLinkedIn />}>
            <a href={contact.linkedinUrl} rel="noopener noreferrer">
              {contact.linkedin}
            </a>
          </ContactItem>
          <ContactItem label="GitHub" icon={<IconGitHub />}>
            <a href={contact.githubUrl} rel="noopener noreferrer">
              {contact.github}
            </a>
          </ContactItem>
        </div>
      </header>

      <div className="resume-body">
        <section className="resume-section">
          <h2>Resumo</h2>
          <p className="resume-summary">{data.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Experiência</h2>
          {data.experience.map((job) => (
            <div className="resume-entry" key={`${job.company}-${job.period}`}>
              <div className="resume-entry-head">
                <span className="resume-entry-title">
                  {job.role}
                  {job.company ? ` · ${job.company}` : ""}
                </span>
                <span className="resume-entry-period">{job.period}</span>
              </div>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Projetos</h2>
          {data.projects.map((project) => (
            <div className="resume-entry" key={project.name}>
              <div className="resume-entry-head">
                <span className="resume-entry-title">{project.name}</span>
              </div>
              <ul>
                {project.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section resume-section--inline">
          <div>
            <h2>Competências</h2>
            <ul className="resume-skills">
              {data.skills.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Certificação</h2>
            <p className="resume-cert">{data.certification}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
