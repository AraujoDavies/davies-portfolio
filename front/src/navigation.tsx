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

const STORAGE_KEY = "portfolio-nav";

type NavigationContextValue = {
  pageIndex: number;
  page: PortfolioPage;
  pages: PortfolioPage[];
  goToPage: (index: number, options?: { hash?: string }) => void;
  goToHash: (hash: string) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

function normalizeHash(rawHash: string): string {
  return rawHash.replace(/^#/, "").trim();
}

function clearUrlHash() {
  if (!window.location.hash) return;
  const cleanUrl = `${window.location.pathname}${window.location.search}`;
  history.replaceState(null, "", cleanUrl);
}

function persistNavHash(hash: string) {
  const normalized = normalizeHash(hash);
  if (!normalized || normalized === "topo") {
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, normalized);
}

function readInitialNav(): { pageIndex: number; focusHash: string } {
  if (typeof window === "undefined") {
    return { pageIndex: 0, focusHash: "" };
  }

  const urlHash = normalizeHash(window.location.hash);
  if (urlHash) {
    clearUrlHash();
    persistNavHash(urlHash);
    return {
      pageIndex: pageIndexForHash(urlHash),
      focusHash: urlHash,
    };
  }

  const stored = sessionStorage.getItem(STORAGE_KEY) ?? "";
  if (stored) {
    return {
      pageIndex: pageIndexForHash(stored),
      focusHash: stored,
    };
  }

  return { pageIndex: 0, focusHash: "" };
}

const initialNav = readInitialNav();

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pageIndex, setPageIndex] = useState(initialNav.pageIndex);

  const goToPage = useCallback(
    (index: number, options?: { hash?: string }) => {
      const next = Math.max(0, Math.min(index, portfolioPages.length - 1));
      const page = portfolioPages[next];
      if (!page) return;

      setPageIndex(next);

      const hash = options?.hash ?? page.hash;
      const cleanHome = next === 0 && (!hash || hash === "topo");

      if (cleanHome) {
        persistNavHash("");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      persistNavHash(hash);

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
      const hash = normalizeHash(rawHash);
      const index = pageIndexForHash(hash);
      goToPage(index, { hash: hash || portfolioPages[index]?.hash });
    },
    [goToPage],
  );

  useEffect(() => {
    const { focusHash } = initialNav;
    if (!focusHash) return;

    const page = portfolioPages[pageIndexForHash(focusHash)];
    if (!page || focusHash === page.hash) return;

    const timer = window.setTimeout(() => scrollToHash(focusHash), 50);
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
