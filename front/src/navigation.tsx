import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  pageIndexForHash,
  portfolioPages,
  scrollToHash,
  type PortfolioPage,
} from "./pages";

type NavigationContextValue = {
  pageIndex: number;
  page: PortfolioPage;
  pages: PortfolioPage[];
  goToPage: (index: number, options?: { hash?: string }) => void;
  goToHash: (hash: string) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

function readInitialIndex() {
  if (typeof window === "undefined") return 0;
  return pageIndexForHash(window.location.hash);
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pageIndex, setPageIndex] = useState(readInitialIndex);

  const goToPage = useCallback(
    (index: number, options?: { hash?: string }) => {
      const next = Math.max(0, Math.min(index, portfolioPages.length - 1));
      const page = portfolioPages[next];
      if (!page) return;

      setPageIndex(next);

      const hash = options?.hash ?? page.hash;
      const href = `#${hash}`;
      if (window.location.hash !== href) {
        history.pushState(null, "", href);
      }

      if (options?.hash && options.hash !== page.hash) {
        scrollToHash(options.hash);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [],
  );

  const goToHash = useCallback(
    (rawHash: string) => {
      const hash = rawHash.replace(/^#/, "").trim();
      const index = pageIndexForHash(hash);
      goToPage(index, { hash: hash || portfolioPages[index]?.hash });
    },
    [goToPage],
  );

  useEffect(() => {
    const onPopState = () => {
      const index = pageIndexForHash(window.location.hash);
      setPageIndex(index);
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && hash !== portfolioPages[index]?.hash) {
        scrollToHash(hash);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) {
      history.replaceState(null, "", `#${portfolioPages[0].hash}`);
      return;
    }

    const page = portfolioPages[pageIndexForHash(hash)];
    if (!page || hash === page.hash) return;

    const timer = window.setTimeout(() => scrollToHash(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      pageIndex,
      page: portfolioPages[pageIndex] ?? portfolioPages[0],
      pages: portfolioPages,
      goToPage,
      goToHash,
    }),
    [pageIndex, goToPage, goToHash],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return ctx;
}
