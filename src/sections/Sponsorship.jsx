import { useActiveContent } from "../lib/useActiveContent";
import "./Sponsorship.scss";

export const Sponsorship = () => {
  const content = useActiveContent();
  const data = content?.sponsorship;

  if (!data) return null;

  return (
    <section className="sponsorship">
      <div className="wrap sponsorship__inner">
        {/* Left — copy */}
        <div className="sponsorship__copy">
          <h2 className="sponsorship__title">{data.title}</h2>
          <p className="sponsorship__description">{data.description}</p>

          <ul className="sponsorship__list">
            {data.statements.map((text, i) => (
              <li key={i} className="sponsorship__item">
                <span className="sponsorship__check" aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — photo collage */}
        <div className="sponsorship__collage" aria-hidden="true">
          {data.photos.slice(0, 7).map((url, i) => (
            <img
              key={i}
              className="sponsorship__photo"
              src={url}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
