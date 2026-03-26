import { useActiveContent } from "../lib/useActiveContent";
import "./Hero.scss";

export const Hero = () => {
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
            <a className="btn" href="#join">
              {content.hero.ctaPrimary}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
