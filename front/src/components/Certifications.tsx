import { certifications } from "../content";

export function Certifications() {
  return (
    <section className="section section--compact" id="certificacoes">
      <div className="section__intro">
        <p className="section__eyebrow">Certificações</p>
        <h2 className="section__title">AWS</h2>
      </div>
      <ul className="certs">
        {certifications.map((cert) => (
          <li key={cert.name} className="certs__item">
            <span className="certs__name">{cert.name}</span>
            <span
              className={`certs__status certs__status--${cert.status === "concluída" ? "done" : "wip"}`}
            >
              {cert.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
