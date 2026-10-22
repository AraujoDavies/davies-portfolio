import { useState } from "react";
import { about, hero, links } from "../content";

export function About() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = links.photo.length > 0 && !photoFailed;

  return (
    <section className="section" id="sobre">
      <div className="about">
        <div className="about__media" aria-hidden={showPhoto ? undefined : true}>
          <div
            className={`about__avatar${showPhoto ? " about__avatar--photo" : ""}`}
          >
            {showPhoto ? (
              <img
                src={links.photo}
                alt={hero.name}
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <span>{hero.initials}</span>
            )}
          </div>
        </div>
        <div className="about__copy">
          <p className="section__eyebrow">Sobre</p>
          <h2 className="section__title">Da dor do usuário ao sistema em produção</h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="about__text">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
