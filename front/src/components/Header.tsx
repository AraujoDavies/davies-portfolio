import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
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

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();
  const drawerId = useId();
  const { goToHash, page } = useNavigation();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 520px)");
    const onChange = () => {
      if (!media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const renderNavLinks = (options?: { interactive?: boolean }) =>
    nav.map((item) => {
      const active =
        item.href === "#"
          ? page.id === "inicio"
          : `#${page.hash}` === item.href || page.hash === item.href.slice(1);
      const interactive = options?.interactive ?? true;

      return (
        <a
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          tabIndex={interactive ? 0 : -1}
          onClick={(event) => {
            event.preventDefault();
            goToHash(item.href);
            closeMenu();
          }}
        >
          {item.label}
        </a>
      );
    });

  const drawer = (
    <div
      className={`site-header__drawer-root${menuOpen ? " is-open" : ""}`}
      aria-hidden={menuOpen ? undefined : true}
    >
      <button
        type="button"
        className="site-header__drawer-backdrop"
        tabIndex={menuOpen ? 0 : -1}
        aria-label="Fechar menu"
        onClick={closeMenu}
      />
      <aside
        id={drawerId}
        className="site-header__drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="site-header__drawer-top">
          <a
            href="/"
            className="site-header__drawer-brand"
            tabIndex={menuOpen ? 0 : -1}
            onClick={(event) => {
              event.preventDefault();
              goToHash("");
              closeMenu();
            }}
          >
            {`<${hero.name} />`}
          </a>
          <button
            type="button"
            className="site-header__drawer-close"
            aria-label="Fechar menu"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="site-header__drawer-nav" aria-label="Menu">
          {renderNavLinks({ interactive: menuOpen })}
        </nav>
      </aside>
    </div>
  );

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
              closeMenu();
            }}
          >
            {`<${hero.name} />`}
          </a>
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls={drawerId}
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
            {renderNavLinks()}
          </nav>
        </div>
      </div>

      {createPortal(drawer, document.body)}
    </header>
  );
}
