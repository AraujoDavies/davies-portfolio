import { useEffect, useId, useState } from "react";
import { hero, nav } from "../content";
import { useNavigation } from "../navigation";
import { GitHubButton } from "./GitHubButton";
import { SiteSearch } from "./SiteSearch";
import { ThemeSwitcher } from "./ThemeSwitcher";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="site-header__menu-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M5 7h14" />
          <path d="M5 12h14" />
          <path d="M5 17h14" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();
  const { goToHash, page } = useNavigation();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 520px)");
    const onChange = () => {
      if (!media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={`site-header${menuOpen ? " is-menu-open" : ""}`}>
      <div className="site-header__inner">
        <div className="site-header__bar">
          <a
            href="/"
            className="site-header__brand"
            onClick={(event) => {
              event.preventDefault();
              goToHash("");
              setMenuOpen(false);
            }}
          >
            {`<${hero.name} />`}
          </a>
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls={navId}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
          <div className="site-header__search">
            <SiteSearch />
          </div>
          <ThemeSwitcher />
          <GitHubButton />
        </div>
        <div className="site-header__row">
          <nav id={navId} className="site-header__nav" aria-label="Principal">
            {nav.map((item) => {
              const active =
                item.href === "#"
                  ? page.id === "inicio"
                  : `#${page.hash}` === item.href || page.hash === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    goToHash(item.href);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
