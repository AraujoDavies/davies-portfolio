import { useState } from "react";
import { hero, links } from "../content";

export function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = links.photo.length > 0 && !photoFailed;

  return (
    <section className="hero" id="topo" aria-labelledby="hero-name">
      <div className="hero__grid">
        <div className="hero__media" aria-hidden={showPhoto ? undefined : true}>
          <div
            className={`hero__avatar${showPhoto ? " hero__avatar--photo" : ""}`}
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
        <div className="hero__copy">
          <p className="hero__eyebrow">Portfólio</p>
          <h1 id="hero-name" className="hero__name">
            {hero.name}
          </h1>
          <p className="hero__title">{hero.title}</p>
          <p className="hero__pitch">{hero.pitch}</p>
        </div>
      </div>
      <div className="hero__atmosphere" aria-hidden="true" />
    </section>
  );
}
