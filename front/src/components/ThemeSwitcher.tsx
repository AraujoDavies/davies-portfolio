import { themes, useTheme, type ThemeId } from "../theme";

function ThemeIcon({ theme }: { theme: ThemeId }) {
  if (theme === "minimal") {
    return (
      <svg
        className="theme-switcher__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }

  if (theme === "cloud") {
    return (
      <svg
        className="theme-switcher__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 18a4.5 4.5 0 0 1-.4-8.98 5.5 5.5 0 0 1 10.7 1.48A3.75 3.75 0 0 1 18.5 18H7.5z" />
        <path d="M16.2 8.2a3.2 3.2 0 0 0-5.1-1.6" />
      </svg>
    );
  }

  return (
    <svg
      className="theme-switcher__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
    </svg>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const current = themes.find((t) => t.id === theme) ?? themes[0];
  const next =
    themes[(themes.findIndex((t) => t.id === theme) + 1) % themes.length];

  return (
    <button
      type="button"
      className={`theme-switcher theme-switcher--${theme}`}
      aria-label={`Tema: ${current.label}. Clique para ${next.label}`}
      title={`${current.label} → ${next.label}`}
      onClick={() => setTheme(next.id)}
    >
      <ThemeIcon theme={theme} key={theme} />
    </button>
  );
}
