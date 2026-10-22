export type PortfolioPage = {
  id: string;
  label: string;
  hash: string;
  hashes: string[];
};

export const portfolioPages: PortfolioPage[] = [
  {
    id: "inicio",
    label: "Início",
    hash: "topo",
    hashes: ["topo", "numeros"],
  },
  {
    id: "projetos",
    label: "Projetos",
    hash: "projetos",
    hashes: ["projetos", "cndmanager", "izitips", "aurora-clone"],
  },
  {
    id: "experiencia",
    label: "Experiência",
    hash: "experiencia",
    hashes: ["experiencia", "exp-fundador", "exp-ics", "exp-suporte"],
  },
  {
    id: "stack",
    label: "Stack",
    hash: "stack",
    hashes: ["stack"],
  },
  {
    id: "sobre",
    label: "Sobre",
    hash: "sobre",
    hashes: ["sobre", "certificacoes"],
  },
  {
    id: "contato",
    label: "Contato",
    hash: "contato",
    hashes: ["contato"],
  },
];

export function pageIndexForHash(rawHash: string): number {
  const hash = rawHash.replace(/^#/, "").trim().toLowerCase();
  if (!hash) return 0;

  const index = portfolioPages.findIndex((page) =>
    page.hashes.some((item) => item.toLowerCase() === hash),
  );
  return index >= 0 ? index : 0;
}

export function scrollToHash(rawHash: string) {
  const id = rawHash.replace(/^#/, "").trim();
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.requestAnimationFrame(() => {
    const target = document.getElementById(id);
    if (!target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - margin;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}
