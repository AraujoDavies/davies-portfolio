import { experience } from "../content";

export function Experience() {
  return (
    <section className="section" id="experiencia">
      <div className="section__intro">
        <p className="section__eyebrow">Experiência</p>
        <h2 className="section__title">Trajetória</h2>
      </div>
      <ol className="experience">
        {experience.map((job) => (
          <li
            key={job.id}
            id={job.id}
            className="experience__item"
          >
            <div className="experience__meta">
              <p className="experience__period">{job.period}</p>
            </div>
            <div className="experience__content">
              <h3 className="experience__role">
                {job.role}
                {job.company ? (
                  <>
                    <span className="experience__sep"> · </span>
                    <span className="experience__company">{job.company}</span>
                  </>
                ) : null}
              </h3>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 48)}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
