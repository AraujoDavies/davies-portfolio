# Portfólio — Davies Araujo

**Backend Engineer | Python & AWS**

Site profissional com cases de automação, SaaS e dados em produção.

**Live:** [davies.ataqtech.com.br](https://davies.ataqtech.com.br/)

Construo sistemas de automação e dados que rodam em produção, de SaaS próprio a ETL com milhões de registros. Entendo o sistema de ponta a ponta, do código ao deploy.

---

## Destaques

| Número | Contexto |
| --- | --- |
| **60 mil+** | Certidões emitidas no 1º semestre de 2026 (CNDManager) |
| **160+** | Sites automatizados |
| **100+** | Usuários ativos (Izitips) |
| **10M+** | Usuários unificados em um ETL |
| **15 min** | Clone de uma base Aurora de 100 GB+ |

---

## Projetos

### [CNDManager](https://test.cndmanager.com.br)
Automação de certidões de débitos para escritórios de advocacia.

Consulta semanal de 1.500+ CNPJs em 160+ sites, com workers distribuídos, Selenoid e stack Django + React na AWS.

### [Izitips](https://izitips.com.br)
Do Telegram para a planilha em 1 clique.

SaaS que lê mensagens de grupos de tipsters, preenche planilhas automaticamente e oferece dashboards para analisar resultados. [Vídeo do fluxo](https://youtu.be/-QrJzI5w0FE).

### Aurora Clone *(em breve)*
Ambiente de DEV realista em ~15 minutos: clone automatizado de Aurora com sanitização de dados e conformidade com a LGPD.

---

## Stack do site

| Camada | Tecnologia |
| --- | --- |
| Frontend | Vite + React + TypeScript |
| Temas | 3 temas (`data-theme`): escuro técnico, minimalista claro, escuro cloud |
| Conteúdo | Centralizado em [`front/src/content.ts`](front/src/content.ts) |
| Infra | S3 privado + CloudFront (OAC) + ACM + Route 53 — Terraform em [`infra/`](infra/) |
| CI/CD | GitHub Actions → build → `s3 sync` → invalidação CloudFront |

---

## Estrutura do repositório

```
portfolio-davies/
├── front/                 # App Vite + React
│   └── src/content.ts     # Textos, links e cases
├── infra/                 # Terraform (S3 + CloudFront)
└── .github/workflows/     # Deploy em push na main
```

---

## Desenvolvimento local

```bash
cd front
npm install
npm run dev
```

Build de produção:

```bash
cd front
npm run build
```

O artefato estático fica em `front/dist/`.

---

## Deploy

Push em `main` com alterações em `front/**` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Secrets e variáveis no GitHub (environment `production`):

| Tipo | Nome |
| --- | --- |
| Secret | `AWS_ROLE_ARN` |
| Variable | `AWS_S3_BUCKET` |
| Variable | `CLOUDFRONT_DISTRIBUTION_ID` |

Detalhes da infra e do deploy manual: [`infra/README.md`](infra/README.md).

---

## Contato

- **GitHub:** [AraujoDavies](https://github.com/AraujoDavies)
- **LinkedIn:** [Davies Araujo](https://br.linkedin.com/in/davies-araujo-b62041261)
- **E-mail:** [daviesaraujo@hotmail.com](mailto:daviesaraujo@hotmail.com)

Em busca da próxima oportunidade como Backend Engineer com Python e AWS.
