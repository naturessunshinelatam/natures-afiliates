import { useActiveContent } from "../lib/useActiveContent";
import "./Hero.scss";

export const Hero = ({ onJoinClick }) => {
  const content = useActiveContent();

  if (!content?.hero) return null;

  return (
    <div
      className="hero"
      style={{ "--hero-image": `url(${content.hero.image})` }}
    >
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__copy">
          <h1 className="hero__title">{content.hero.title}</h1>
          <p className="hero__subtitle">{content.hero.subtitle}</p>

          <div className="hero__cta">
            <button className="btn" onClick={onJoinClick}>
              {content.hero.ctaPrimary}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
