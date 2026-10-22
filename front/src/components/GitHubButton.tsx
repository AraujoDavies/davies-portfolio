import { useEffect, useState } from "react";
import { links } from "../content";
import { IconGitHub } from "./SocialIcons";

type Stats = {
  stars: number;
  forks: number;
};

type RepoPayload = {
  fork?: boolean;
  stargazers_count?: number;
  forks_count?: number;
};

function githubTarget(url: string) {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    const owner = parts[0] ?? "GitHub";
    const repo = parts[1];
    return {
      owner,
      repo,
      label: repo ? `${owner}/${repo}` : owner,
    };
  } catch {
    return { owner: "GitHub", repo: undefined, label: "GitHub" };
  }
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
      />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.5.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
      />
    </svg>
  );
}

export function GitHubButton() {
  const target = githubTarget(links.github);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const url = target.repo
      ? `https://api.github.com/repos/${target.owner}/${target.repo}`
      : `https://api.github.com/users/${target.owner}/repos?per_page=100&type=owner`;

    fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: RepoPayload | RepoPayload[] | null) => {
        if (!data) return;
        if (target.repo && !Array.isArray(data)) {
          setStats({
            stars: data.stargazers_count ?? 0,
            forks: data.forks_count ?? 0,
          });
          return;
        }
        if (!Array.isArray(data)) return;
        const own = data.filter((repo) => !repo.fork);
        setStats({
          stars: own.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0),
          forks: own.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0),
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
      });

    return () => controller.abort();
  }, [target.owner, target.repo]);

  const label = stats
    ? `${target.label} no GitHub, ${stats.stars} estrelas e ${stats.forks} forks`
    : `${target.label} no GitHub`;

  return (
    <a
      className="github-source"
      href={links.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <IconGitHub className="github-source__mark" />
      <span className="github-source__body">
        <span className="github-source__name">{target.label}</span>
        {stats ? (
          <span className="github-source__facts">
            <span className="github-source__fact">
              <StarIcon />
              {stats.stars}
            </span>
            <span className="github-source__fact">
              <ForkIcon />
              {stats.forks}
            </span>
          </span>
        ) : null}
      </span>
    </a>
  );
}
