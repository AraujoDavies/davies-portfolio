export type ResumeVariant = "product-ai" | "django-react";

export type ResumeExperience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  bullets: string[];
};

export type ResumeData = {
  name: string;
  headline: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    portfolioUrl: string;
    linkedin: string;
    linkedinUrl: string;
    github: string;
    githubUrl: string;
  };
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: string[];
  certification: string;
};

const contact = {
  email: "daviesaraujo@hotmail.com",
  phone: "(11) 93062-8076",
  location: "Caieiras – SP",
  portfolio: "davies.ataqtech.com.br",
  portfolioUrl: "https://davies.ataqtech.com.br",
  linkedin: "in/davies-araujo-b62041261",
  linkedinUrl: "https://linkedin.com/in/davies-araujo-b62041261",
  github: "AraujoDavies",
  githubUrl: "https://github.com/AraujoDavies",
};

const certification = "AWS Certified Cloud Practitioner";

const experienceProductAi: ResumeExperience[] = [
  {
    role: "Fundador e Engenheiro",
    company: "Izitips e CNDManager · Consultoria AWS",
    period: "2025 – atual",
    bullets: [
      "Dois SaaS em produção de ponta a ponta: produto, código, deploy e operação com foco em custo e estabilidade.",
      "Automação em escala (160+ fontes, 60k+ certidões/semestre) e integrações (Telegram, APIs) com monitoramento em produção.",
      "Consultoria AWS: clone Aurora prod→DEV com sanitização LGPD; deploy de landing pages.",
    ],
  },
  {
    role: "Backend Engineer",
    company: "ICS/AmDigital",
    period: "2023 – 2025",
    bullets: [
      "Infra AWS (ECS, RDS, auto scaling) e webhook API Gateway + Lambda para integração em tempo real.",
      "ETL unificando 10M+ usuários entre CRMs (Parquet, Pandas, MySQL, carga em lote).",
    ],
  },
  {
    role: "Suporte de TI",
    company: "Experiência anterior",
    period: "2020 – 2023",
    bullets: [
      "Atendimento a usuários; base para decisões de produto orientadas à dor real.",
    ],
  },
];

const experienceDjangoReact: ResumeExperience[] = [
  {
    role: "Fundador e Engenheiro",
    company: "Izitips e CNDManager · Consultoria AWS",
    period: "2025 – atual",
    bullets: [
      "Stack Django + React + MySQL em Docker/Nginx na AWS (EC2, S3, CloudFront) para dois produtos SaaS.",
      "APIs, painéis React e automação Selenium/Selenoid; operação contínua sem downtime registrado.",
      "Rotinas Python na AWS (Aurora clone, sanitização de dados, LGPD).",
    ],
  },
  {
    role: "Backend Engineer",
    company: "ICS/AmDigital",
    period: "2023 – 2025",
    bullets: [
      "Backend e infra AWS: ECR/ECS, RDS, Lambda e API Gateway.",
      "Modelagem MySQL e ETL de 10M+ registros (Parquet → Pandas → índices e carga batch).",
    ],
  },
  {
    role: "Suporte de TI",
    company: "Experiência anterior",
    period: "2020 – 2023",
    bullets: [
      "Suporte e diagnóstico; transição para engenharia de software aplicada.",
    ],
  },
];

const projectsProductAi: ResumeProject[] = [
  {
    name: "CNDManager",
    bullets: [
      "Automação semanal de 1.500+ CNPJs em 160+ sites; 60k+ certidões no 1º semestre de 2026.",
      "Workers distribuídos + Selenoid; economia ~1 semana de trabalho manual por ciclo.",
    ],
  },
  {
    name: "Izitips",
    bullets: [
      "SaaS 100+ usuários: ingestão Telegram → planilha e dashboards de ROI em 1 clique.",
      "Produto, backend e operação em produção com alertas e monitoramento.",
    ],
  },
  {
    name: "Aurora Clone",
    bullets: [
      "Clone automatizado prod→DEV (~100 GB em ~15 min) com sanitização e conformidade LGPD.",
    ],
  },
];

const projectsDjangoReact: ResumeProject[] = [
  {
    name: "CNDManager",
    bullets: [
      "Django, React, MySQL, Selenium/Selenoid, Docker Compose, Nginx, AWS.",
      "160+ integrações automatizadas; arquitetura compartilhada para custo operacional baixo.",
    ],
  },
  {
    name: "Izitips",
    bullets: [
      "Django + React; S3/CloudFront + EC2; Pyrogram e bots Telegram.",
      "APIs REST, dashboards React e 100+ usuários ativos.",
    ],
  },
  {
    name: "Aurora Clone",
    bullets: [
      "Python + AWS Aurora/RDS; pipeline de clone e sanitização para ambientes de DEV.",
    ],
  },
];

const skillsProductAi = [
  "Python · automação · integrações (REST, Telegram)",
  "SaaS E2E · Docker · Linux · Nginx",
  "AWS: EC2, S3, Lambda, RDS/Aurora, ECS, API Gateway",
  "Dados: Pandas, Selenium · MySQL · PostgreSQL",
];

const skillsDjangoReact = [
  "Django · Django REST Framework · FastAPI · Flask",
  "React · APIs REST · SQLAlchemy",
  "MySQL · PostgreSQL · Redis · Pandas",
  "AWS · Docker · Docker Compose · Nginx · Linux",
];

export const resumeVariants: Record<ResumeVariant, ResumeData> = {
  "product-ai": {
    name: "Davies Araujo",
    headline: "Product Engineer | Python | AI | AWS",
    summary:
      "Engenheiro de software com aproximadamente 4 anos em Python, SaaS, automação e AWS. Entrego do desenho ao deploy e operação, com integrações em produção. Foco em engenharia aplicada a produtos e soluções com IA.",
    contact,
    experience: experienceProductAi,
    projects: projectsProductAi,
    skills: skillsProductAi,
    certification,
  },
  "django-react": {
    name: "Davies Araujo",
    headline: "Backend Engineer | Django | React | AWS",
    summary:
      "Backend com Django, React, APIs e dados em produção. SaaS próprio, ETL em larga escala e AWS (ECS, Lambda, RDS/Aurora). Do modelo de dados ao frontend e à operação, com foco em confiabilidade e custo.",
    contact,
    experience: experienceDjangoReact,
    projects: projectsDjangoReact,
    skills: skillsDjangoReact,
    certification,
  },
};

/** Rota sem link no site. Variantes: /rota-cv e /rota-cv/b */
export const RESUME_PATH_BASE = "/rota-cv";

export function resumePathForVariant(variant: ResumeVariant): string {
  return variant === "django-react"
    ? `${RESUME_PATH_BASE}/b`
    : RESUME_PATH_BASE;
}

export function parseResumeVariantFromPath(pathname: string): ResumeVariant {
  const normalized = pathname.replace(/\/+$/, "").toLowerCase();
  if (
    normalized === `${RESUME_PATH_BASE}/b` ||
    normalized.endsWith(`${RESUME_PATH_BASE}/b`)
  ) {
    return "django-react";
  }
  return "product-ai";
}

export function isResumePath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "").toLowerCase();
  return (
    normalized === RESUME_PATH_BASE ||
    normalized.startsWith(`${RESUME_PATH_BASE}/`)
  );
}
