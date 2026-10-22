import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../content";
import { useNavigation } from "../navigation";

/** Matches `.project { scroll-margin-top: 7.5rem }` / sticky side nav. */
const SCROLL_OFFSET_PX = 7.5 * 16;

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function youtubeEmbedSrc(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let id = "";

    if (host === "youtu.be") {
      id = parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" || parts[0] === "shorts") {
        id = parts[1] ?? "";
      } else {
        id = parsed.searchParams.get("v") ?? "";
      }
    }

    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}

function ProjectVideo({ label, url }: { label: string; url: string }) {
  const src = youtubeEmbedSrc(url);

  if (!src) {
    return (
      <a
        className="project__video-fallback"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <figure className="project__video">
      <figcaption className="project__video-label">{label}</figcaption>
      <div className="project__video-frame">
        <iframe
          src={src}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </figure>
  );
}

function ProjectCase({ project }: { project: Project }) {
  return (
    <article
      className={`project${project.comingSoon ? " project--soon" : ""}`}
      id={project.id}
    >
      <header className="project__header">
        <div>
          <div className="project__title-row">
            <div className="project__title-main">
              <h3 className="project__name">{project.name}</h3>
              {project.repoUrl ? (
                <a
                  className="project__external"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${project.name} em uma nova aba`}
                >
                  <ExternalLinkIcon />
                </a>
              ) : null}
              {project.badge ? (
                <span className="project__badge">{project.badge}</span>
              ) : null}
            </div>
          </div>
          <p className="project__tagline">{project.tagline}</p>
        </div>
      </header>

      {project.videoLabel && project.videoUrl ? (
        <ProjectVideo label={project.videoLabel} url={project.videoUrl} />
      ) : null}

      {project.comingSoon ? (
        <div className="project__diagram" aria-hidden="true">
          <div className="project__diagram-inner">
            <span className="project__diagram-node">Prod Aurora</span>
            <span className="project__diagram-arrow">→</span>
            <span className="project__diagram-node project__diagram-node--accent">
              Clone + Sanitize
            </span>
            <span className="project__diagram-arrow">→</span>
            <span className="project__diagram-node">DEV</span>
          </div>
          <p className="project__diagram-caption">Diagrama de arquitetura</p>
        </div>
      ) : null}

      <div className="project__body">
        <div className="project__block">
          <h4>Problema</h4>
          <p>{project.problem}</p>
        </div>
        <div className="project__block">
          <h4>Solução</h4>
          <p>{project.solution}</p>
        </div>
        {project.decisions.length > 0 ? (
          <div className="project__block">
            <h4>Decisões técnicas</h4>
            <ul>
              {project.decisions.map((d) => (
                <li key={d.slice(0, 40)}>{d}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="project__block">
          <h4>Resultado</h4>
          <ul>
            {project.results.map((r) => (
              <li key={r.slice(0, 40)}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="project__footer">
        <div className="project__footer-copy">
          <p className="project__stack">
            <span className="project__meta-label">Stack</span>
            {project.stack.join(" · ")}
          </p>
          <p className="project__role">
            <span className="project__meta-label">Meu papel</span>
            {project.role}
          </p>
          {project.note ? <p className="project__note">{project.note}</p> : null}
        </div>
      </footer>
    </article>
  );
}

function getProjectNodes() {
  return projects
    .map((project) => {
      const el = document.getElementById(project.id);
      return el ? { id: project.id, el } : null;
    })
    .filter((node): node is { id: string; el: HTMLElement } => Boolean(node));
}

function resolveActiveProjectId(): string {
  const nodes = getProjectNodes();
  if (nodes.length === 0) return projects[0]?.id ?? "";

  const last = nodes[nodes.length - 1];
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );

  // Absolute bottom of the page (footer / page-nav still below the cards).
  if (window.scrollY >= maxScroll - 64) {
    return last.id;
  }

  // Document Y of the sticky-header reading line.
  const line = window.scrollY + SCROLL_OFFSET_PX + 1;
  let current = nodes[0].id;

  for (const { id, el } of nodes) {
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= line) current = id;
  }

  // Short final card often cannot reach the offset line while still on-screen.
  const prev = nodes[nodes.length - 2];
  if (prev) {
    const prevBottom = prev.el.getBoundingClientRect().bottom;
    const lastTop = last.el.getBoundingClientRect().top;
    if (prevBottom <= SCROLL_OFFSET_PX + 96 && lastTop < window.innerHeight * 0.75) {
      return last.id;
    }
  }

  return current;
}

export function Projects() {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");
  const { goToHash } = useNavigation();
  const pinnedIdRef = useRef<string | null>(null);
  const pinTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;

    const updateActive = () => {
      if (pinnedIdRef.current) {
        setActiveId(pinnedIdRef.current);
        return;
      }
      setActiveId(resolveActiveProjectId());
    };

    const onScrollOrResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (pinTimerRef.current !== null) window.clearTimeout(pinTimerRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const activateProject = (id: string) => {
    pinnedIdRef.current = id;
    setActiveId(id);

    if (pinTimerRef.current !== null) window.clearTimeout(pinTimerRef.current);

    const releasePin = () => {
      pinnedIdRef.current = null;
      pinTimerRef.current = null;
      setActiveId(resolveActiveProjectId());
    };

    const onScrollEnd = () => {
      window.removeEventListener("scrollend", onScrollEnd);
      releasePin();
    };

    window.addEventListener("scrollend", onScrollEnd);
    // Fallback when scrollend is missing or scroll distance is ~0.
    pinTimerRef.current = window.setTimeout(() => {
      window.removeEventListener("scrollend", onScrollEnd);
      releasePin();
    }, 900);

    goToHash(id);
  };

  return (
    <section className="section" id="projetos">
      <div className="section__intro">
        <p className="section__eyebrow">Projetos</p>
        <h2 className="section__title">Cases em produção</h2>
        <p className="section__lead">
          Do problema à operação: o que foi construído, por quê, e o impacto em
          produção.
        </p>
      </div>
      <div className="projects-layout">
        <aside className="projects-side" aria-label="Navegação dos projetos">
          <p className="projects-side__label">Nesta página</p>
          <nav className="projects-side__nav">
            <ol className="projects-side__list">
              {projects.map((project, index) => {
                const active = project.id === activeId;
                return (
                  <li key={project.id}>
                    <a
                      href={`#${project.id}`}
                      className={`projects-side__link${active ? " is-active" : ""}`}
                      aria-current={active ? "true" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        activateProject(project.id);
                      }}
                    >
                      <span className="projects-side__index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="projects-side__copy">
                        <span className="projects-side__name">{project.name}</span>
                        <span className="projects-side__meta">
                          {project.badge ?? project.tagline}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>
        <div className="projects">
          {projects.map((project) => (
            <ProjectCase key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
