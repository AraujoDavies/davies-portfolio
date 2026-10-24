export const links = {
  github: "https://github.com/AraujoDavies",
  portfolioRepo: "https://github.com/AraujoDavies",
  linkedin: "https://br.linkedin.com/in/davies-araujo-b62041261",
  email: "mailto:daviesaraujo@hotmail.com",
  // Projetos — troque pelos links reais quando tiver
  cndManager: "https://test.cndmanager.com.br",
  easyTips: "https://izitips.com.br",
  izitipsVideo: "https://youtu.be/-QrJzI5w0FE",
  auroraCloneRepo: "https://github.com/AraujoDavies/aurora-clone",
  auroraCloneVideo: "https://www.youtube.com/watch?v=AURORA_CLONE_VIDEO",
  photo: "https://avatars.githubusercontent.com/u/95246380?",
};

export const hero = {
  name: "Davies Araujo",
  title: "Backend Engineer | Python & AWS",
  pitch:
    "Construo sistemas de automação e dados que rodam em produção, de SaaS próprio a ETL com milhões de registros. Entendo o sistema de ponta a ponta, do código ao deploy.",
  initials: "DS",
};

export const stats = [
  { value: "60 mil+", label: "certidões emitidas no 1º semestre de 2026" },
  { value: "160+", label: "sites automatizados" },
  { value: "100+", label: "usuários ativos" },
  { value: "10M+", label: "usuários unificados em um ETL" },
  { value: "15 min", label: "para clonar uma base Aurora de 100 GB+" },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  problem: string;
  solution: string;
  decisions: string[];
  results: string[];
  stack: string[];
  role: string;
  note?: string;
  repoUrl?: string;
  videoLabel?: string;
  videoUrl?: string;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    id: "cndmanager",
    name: "CNDManager",
    tagline: "Automação de certidões de débitos para escritórios de advocacia",
    problem:
      "O time de um escritório de advocacia de grande porte gastava horas toda semana consultando certidões e caixas postais, site por site, na mão.",
    solution:
      "Um sistema que consulta semanalmente mais de 1.500 CNPJs em mais de 160 sites, salva os arquivos de forma organizada e entrega tudo pronto para o time.",
    decisions: [
      "Os robôs rodam em workers distribuídos em 2 escritórios, e não em cloud. Abrir browsers é pesado e caro em servidores, e captchas e ferramentas anti-bot bloqueiam IPs de datacenter. Usar a rede dos escritórios resolveu os dois problemas.",
      "A orquestração usa Selenoid em containers Docker e escala até 10 workers por PC.",
      "O backend e o frontend reaproveitam a estrutura do Izitips para manter o custo de infraestrutura baixo.",
    ],
    results: [
      "Mais de 60 mil certidões emitidas no 1º semestre de 2026",
      "Economia média estimada de cerca de uma semana de trabalho manual",
      "Operação em produção com monitoramento e alertas no Telegram, sem downtime registrado",
    ],
    stack: [
      "Python",
      "Selenium",
      "Selenoid",
      "Django",
      "MySQL",
      "React",
      "Docker Compose",
      "Nginx",
      "AWS (EC2, S3, CloudFront)",
    ],
    role: "concepção, desenvolvimento, infraestrutura e operação",
    repoUrl: links.cndManager,
  },
  {
    id: "izitips",
    name: "Izitips",
    tagline: "Do Telegram para a planilha em 1 clique",
    problem:
      "Quem acompanha grupos de tipsters perde horas copiando cada aposta do Telegram para uma planilha: odd, valor, evento, casa. É trabalho repetitivo e cheio de erro.",
    solution:
      "Um SaaS que lê as mensagens dos grupos e preenche tudo automaticamente em 1 clique. Além da planilha, o usuário tem dashboards interativos para analisar os resultados e identificar quais grupos dão mais retorno.",
    decisions: [
      "Ingestão e interpretação das mensagens de grupos do Telegram com Pyrogram e bots.",
      "Frontend estático em S3 + CloudFront; backend Django e MySQL em EC2 com Docker Compose e Nginx.",
      "Estrutura compartilhada com o CNDManager para manter o custo operacional baixo.",
    ],
    results: [
      "100+ usuários ativos e crescendo",
      "Horas de trabalho manual por semana reduzidas a 1 clique",
      "Operação em produção com monitoramento e alertas no Telegram, sem downtime registrado",
    ],
    stack: [
      "Python",
      "Django",
      "MySQL",
      "Pyrogram",
      "Telegram Bots",
      "React",
      "Docker Compose",
      "Nginx",
      "AWS (EC2, S3, CloudFront)",
    ],
    role: "produto, desenvolvimento, infraestrutura e operação",
    repoUrl: links.easyTips,
    videoLabel: "Veja o fluxo funcionando",
    videoUrl: links.izitipsVideo,
  },
  {
    id: "aurora-clone",
    name: "Aurora Clone",
    tagline: "Ambiente de DEV realista em 15 minutos",
    badge: "Em breve",
    comingSoon: true,
    problem:
      "Desenvolvedores precisavam depurar com dados próximos da produção, mas copiar o banco na mão era lento e arriscado, principalmente com dados de clientes envolvidos.",
    solution:
      "Uma rotina automatizada que clona o servidor Aurora de produção para o ambiente de DEV, preserva os schemas internos de desenvolvimento e sanitiza os dados dos clientes, unificando senhas e protegendo informações pessoais conforme a LGPD.",
    decisions: [],
    results: [
      "Clone de uma base com mais de 100 GB em cerca de 15 minutos",
      "Debug mais rápido e realista para o time de desenvolvimento",
      "Dados de clientes protegidos em ambientes não produtivos",
    ],
    stack: ["AWS (Aurora, RDS)", "Python"],
    role: "desenho e implementação completos da solução",
    note: "Diagrama de arquitetura em construção. Estou preparando uma versão genérica do projeto para publicar no GitHub, com README e diagrama.",
    repoUrl: links.auroraCloneRepo,
    videoLabel: "Veja o clone em ação",
    videoUrl: links.auroraCloneVideo,
  },
];

export const experience = [
  {
    id: "exp-fundador",
    role: "Fundador e Engenheiro",
    company: "Izitips e CNDManager + Consultoria AWS",
    period: "2025 – atual",
    bullets: [
      "Criei e opero dois SaaS em produção, do código ao deploy, com foco em custo baixo e estabilidade.",
      "Presto consultoria AWS. Em um dos projetos, automatizei o clone de bancos Aurora de produção para DEV com sanitização de dados e conformidade com a LGPD. Também fiz o deploy de 5+ landing pages.",
    ],
  },
  {
    id: "exp-ics",
    role: "Backend Engineer",
    company: "ICS/AmDigital",
    period: "2023 – 2025",
    bullets: [
      "Subi a infra na AWS de uma plataforma de apostas (ECR + ECS com auto scaling e RDS) e criei um webhook em API Gateway + Lambda que atualiza os spins de jogos de cassino e slot.",
      "Desenvolvi um ETL que integrou diversos CRMs e unificou uma base com mais de 10 milhões de usuários: conversão de arquivos Parquet, análise da estrutura com Pandas, modelagem de tabelas no MySQL com índices nas colunas principais, padronização de contatos e tipagem, e carga em lote.",
    ],
  },
  {
    id: "exp-suporte",
    role: "Suporte de TI",
    company: "",
    period: "2020 – 2023",
    bullets: [
      "Atendimento e resolução de problemas de usuários, a base da minha visão de produto: conhecer a dor de quem usa antes de construir a solução.",
    ],
  },
];

export const stackHighlights = [
  "Python",
  "Django",
  "FastAPI",
  "AWS",
  "Docker",
  "PostgreSQL",
];

export const stackCategories = [
  { name: "Linguagens", items: ["Python", "SQL"] },
  { name: "Frontend", items: ["React"] },
  {
    name: "Backend e APIs",
    items: [
      "Django",
      "Django REST Framework",
      "Flask",
      "FastAPI",
      "SQLAlchemy",
    ],
  },
  {
    name: "Cloud",
    items: [
      "EC2",
      "S3",
      "CloudFront",
      "Lambda",
      "RDS/Aurora",
      "ALB",
      "Auto Scaling",
      "ECS",
      "ECR",
      "API Gateway",
    ],
  },
  { name: "Bancos de dados", items: ["MySQL", "PostgreSQL", "Redis"] },
  {
    name: "Automação e dados",
    items: ["Selenium", "Selenoid", "Pandas", "Pytest", "Pyrogram"],
  },
  {
    name: "Infra e DevOps",
    items: ["Docker", "Docker Compose", "Linux", "WSL", "Nginx"],
  },
  { name: "Integrações", items: ["APIs REST", "Telegram Bots", "Discord API"] },
  { name: "Ferramentas", items: ["Git", "GitHub", "Cursor"] },
];

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", status: "concluída" as const },
  {
    name: "Próximas certificações AWS",
    status: "em andamento" as const,
  },
];

export const about = {
  paragraphs: [
    "Comecei no suporte de TI em 2020, resolvendo problemas de usuários todos os dias. Em 2023 passei para desenvolvimento backend: subi a infra na AWS de uma plataforma de apostas (ECR/ECS, auto scaling, RDS) e criei um webhook (API Gateway + Lambda) que atualiza os spins de jogos de cassino e slot. Também unifiquei uma base com mais de 10 milhões de usuários. Hoje crio e opero meus próprios produtos, o Izitips e o CNDManager, e presto consultoria AWS.",
    "Gosto de transformar tarefas manuais e repetitivas em sistemas que funcionam sozinhos, cuidando de custo, estabilidade e de quem vai usar. Estou em busca da próxima oportunidade como Backend Engineer com Python e AWS.",
  ],
};

export const nav = [
  { href: "#", label: "Início" },
  { href: "#projetos", label: "Projetos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#stack", label: "Stack" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];
