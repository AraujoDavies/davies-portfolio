import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  about,
  certifications,
  experience,
  hero,
  nav,
  projects,
  stackCategories,
  stackHighlights,
  stats,
} from "../content";
import { useNavigation } from "../navigation";

type SearchEntry = {
  id: string;
  title: string;
  section: string;
  text: string;
  href: string;
  suggest?: boolean;
};

const entries: SearchEntry[] = [
  {
    id: "topo",
    title: hero.name,
    section: "Início",
    text: `${hero.title} ${hero.pitch}`,
    href: "#",
    suggest: true,
  },
  ...nav
    .filter((item) => item.href !== "#")
    .map((item) => ({
      id: item.href.slice(1),
      title: item.label,
      section: "Seção",
      text: item.label,
      href: item.href,
      suggest: true,
    })),
  ...stats.map((stat) => ({
    id: `stat-${stat.value}`,
    title: stat.value,
    section: "Números",
    text: stat.label,
    href: "#numeros",
  })),
  ...projects.map((project) => ({
    id: project.id,
    title: project.name,
    section: "Projetos",
    text: [
      project.tagline,
      project.badge,
      project.problem,
      project.solution,
      ...project.decisions,
      ...project.results,
      ...project.stack,
      project.role,
      project.note,
    ]
      .filter(Boolean)
      .join(" "),
    href: `#${project.id}`,
    suggest: true,
  })),
  ...experience.map((job) => ({
    id: job.id,
    title: job.company ? `${job.role} · ${job.company}` : job.role,
    section: "Experiência",
    text: `${job.period} ${job.bullets.join(" ")}`,
    href: `#${job.id}`,
  })),
  {
    id: "stack-highlights",
    title: "Ferramentas do dia a dia",
    section: "Stack",
    text: stackHighlights.join(" "),
    href: "#stack",
  },
  ...stackCategories.map((category) => ({
    id: `stack-${fold(category.name).replace(/[^a-z0-9]+/g, "-")}`,
    title: category.name,
    section: "Stack",
    text: category.items.join(" "),
    href: "#stack",
  })),
  ...certifications.map((cert) => ({
    id: `cert-${fold(cert.name).replace(/[^a-z0-9]+/g, "-")}`,
    title: cert.name,
    section: "Certificações",
    text: cert.status,
    href: "#certificacoes",
  })),
  {
    id: "sobre-texto",
    title: "Da dor do usuário ao sistema em produção",
    section: "Sobre",
    text: about.paragraphs.join(" "),
    href: "#sobre",
  },
  {
    id: "contato-texto",
    title: "Vamos conversar?",
    section: "Contato",
    text: "Aberto a oportunidades como Backend Engineer com Python e AWS. LinkedIn E-mail",
    href: "#contato",
  },
];

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokensOf(query: string) {
  return fold(query).split(/\s+/).filter(Boolean);
}

function foldIndex(text: string) {
  let folded = "";
  const map: number[] = [];
  for (let index = 0; index < text.length; index += 1) {
    const chunk = fold(text[index] ?? "");
    for (const char of chunk) {
      folded += char;
      map.push(index);
    }
  }
  return { folded, map };
}

function scoreEntry(entry: SearchEntry, tokens: string[]) {
  const title = fold(entry.title);
  const section = fold(entry.section);
  const text = fold(`${entry.title} ${entry.text}`);
  let score = 0;

  for (const token of tokens) {
    if (!text.includes(token) && !section.includes(token)) return 0;
    if (title === token) score += 120;
    else if (title.startsWith(token)) score += 80;
    else if (title.includes(token)) score += 50;
    else if (section.includes(token)) score += 24;
    else score += 10;
  }

  return score;
}

function searchEntries(query: string) {
  const tokens = tokensOf(query);
  if (tokens.length === 0) return [];

  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title),
    )
    .slice(0, 8)
    .map((item) => item.entry);
}

function snippet(text: string, query: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const tokens = tokensOf(query);
  if (tokens.length === 0 || clean.length <= 140) return clean;

  const { folded, map } = foldIndex(clean);
  const at = tokens
    .map((token) => folded.indexOf(token))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (at === undefined) return `${clean.slice(0, 140).trim()}…`;

  const center = map[at] ?? 0;
  let start = Math.max(0, center - 48);
  if (start > 0) {
    const nextSpace = clean.indexOf(" ", start);
    if (nextSpace !== -1 && nextSpace < center) start = nextSpace + 1;
  }
  const end = Math.min(clean.length, start + 140);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < clean.length ? "…" : "";
  return `${prefix}${clean.slice(start, end).trim()}${suffix}`;
}

function highlight(text: string, query: string): ReactNode {
  const tokens = tokensOf(query);
  if (tokens.length === 0) return text;

  const { folded, map } = foldIndex(text);
  const ranges: Array<[number, number]> = [];

  for (const token of tokens) {
    let from = 0;
    while (from < folded.length) {
      const at = folded.indexOf(token, from);
      if (at < 0) break;
      const start = map[at];
      const end = (map[at + token.length - 1] ?? start) + 1;
      if (start !== undefined) ranges.push([start, end]);
      from = at + Math.max(token.length, 1);
    }
  }

  if (ranges.length === 0) return text;

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;
  merged.forEach(([start, end], index) => {
    if (cursor < start) nodes.push(text.slice(cursor, start));
    nodes.push(<mark key={`${start}-${index}`}>{text.slice(start, end)}</mark>);
    cursor = end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5 20.5 21" />
    </svg>
  );
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const { goToHash } = useNavigation();

  const hasQuery = tokensOf(query).length > 0;
  const results = useMemo(() => searchEntries(query), [query]);
  const activeIndex = results.length === 0 ? 0 : Math.min(active, results.length - 1);
  const activeId = results[activeIndex]?.id;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") {
        return;
      }
      event.preventDefault();
      setOpen((current) => !current);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open || !activeId) return;
    const option = document.getElementById(`site-search-opt-${activeId}`);
    option?.scrollIntoView({ block: "nearest" });
  }, [open, activeId]);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) triggerRef.current?.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    setQuery("");
    setActive(0);
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  function openResult(entry: SearchEntry) {
    setOpen(false);
    goToHash(entry.href);
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[activeIndex];
      if (selected) openResult(selected);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  function onDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>("input, button"),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="site-search__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-keyshortcuts="Control+K"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        <span className="site-search__label">Buscar</span>
        <kbd className="site-search__kbd">Ctrl K</kbd>
      </button>
      {open
        ? createPortal(
            <div
              className="site-search__backdrop"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div
                ref={dialogRef}
                className="site-search__dialog"
                role="dialog"
                aria-modal="true"
                aria-label="Buscar no site"
                onKeyDown={onDialogKeyDown}
              >
                <label className="site-search__field">
                  <SearchIcon />
                  <input
                    ref={inputRef}
                    value={query}
                    placeholder="Buscar projetos, experiência, stack…"
                    aria-label="Termo de busca"
                    aria-autocomplete="list"
                    aria-controls={hasQuery ? "site-search-list" : undefined}
                    aria-activedescendant={
                      results[activeIndex]
                        ? `site-search-opt-${results[activeIndex].id}`
                        : undefined
                    }
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActive(0);
                    }}
                    onKeyDown={onInputKeyDown}
                  />
                </label>
                {hasQuery ? (
                  <ul id="site-search-list" className="site-search__list" role="listbox">
                    {results.length === 0 ? (
                      <li className="site-search__empty">
                        Nenhum resultado para “{query.trim()}”.
                      </li>
                    ) : (
                      results.map((entry, index) => (
                        <li key={entry.id} role="presentation">
                          <button
                            id={`site-search-opt-${entry.id}`}
                            type="button"
                            role="option"
                            aria-selected={index === activeIndex}
                            className={`site-search__option${
                              index === activeIndex ? " is-active" : ""
                            }`}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => openResult(entry)}
                          >
                            <span className="site-search__section">{entry.section}</span>
                            <span className="site-search__title">
                              {highlight(entry.title, query)}
                            </span>
                            <span className="site-search__excerpt">
                              {highlight(snippet(entry.text, query), query)}
                            </span>
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                ) : null}
                <p className="site-search__hint">
                  <kbd>↑</kbd>
                  <kbd>↓</kbd> navegar
                  <span aria-hidden="true"> · </span>
                  <kbd>Enter</kbd> abrir
                  <span aria-hidden="true"> · </span>
                  <kbd>Esc</kbd> fechar
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
