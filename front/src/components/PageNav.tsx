import { useNavigation } from "../navigation";

export function PageNav() {
  const { pageIndex, pages, goToPage } = useNavigation();
  const prev = pages[pageIndex - 1];
  const next = pages[pageIndex + 1];

  return (
    <nav className="page-nav" aria-label="Paginação das seções">
      {prev ? (
        <button
          type="button"
          className="page-nav__link page-nav__link--prev"
          onClick={() => goToPage(pageIndex - 1)}
        >
          <span className="page-nav__dir">Anterior</span>
          <span className="page-nav__label">← {prev.label}</span>
        </button>
      ) : (
        <span className="page-nav__spacer" aria-hidden="true" />
      )}
      {next ? (
        <button
          type="button"
          className="page-nav__link page-nav__link--next"
          onClick={() => goToPage(pageIndex + 1)}
        >
          <span className="page-nav__dir">Próxima</span>
          <span className="page-nav__label">{next.label} →</span>
        </button>
      ) : (
        <span className="page-nav__spacer" aria-hidden="true" />
      )}
    </nav>
  );
}
