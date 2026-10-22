import { stackCategories, stackHighlights } from "../content";

export function Stack() {
  return (
    <section className="section" id="stack">
      <div className="section__intro">
        <p className="section__eyebrow">Stack</p>
        <h2 className="section__title">Ferramentas do dia a dia</h2>
        <p className="section__lead stack__highlights">
          {stackHighlights.join(" · ")}
        </p>
      </div>
      <div className="stack-grid">
        {stackCategories.map((cat) => (
          <div key={cat.name} className="stack-grid__row">
            <h3 className="stack-grid__name">{cat.name}</h3>
            <p className="stack-grid__items">{cat.items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
