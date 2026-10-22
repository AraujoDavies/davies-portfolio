import { stats } from "../content";

export function Stats() {
  return (
    <section className="stats" id="numeros" aria-label="Números em destaque">
      <div className="stats__grid">
        {stats.map((stat, i) => (
          <div
            key={stat.value}
            className="stats__item"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="stats__value">{stat.value}</p>
            <p className="stats__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
