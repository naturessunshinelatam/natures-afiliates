import { CtaButton } from "../CtaButton/CtaButton";
import "./Card.scss";

export const Card = ({ body = {}, className = "", onJoinClick }) => {
  const bulletPoints = [
    body.mission,
    body.communityLine,
    body.opportunityLine,
  ].filter(Boolean);

  return (
    <article className={`card ${className}`.trim()}>
      <div className="card__media">
        <div className="card__imageFrame">
          <img src={body.imgBestSeller} alt={body.title} />
        </div>
      </div>
      <div className="card__content">
        <p className="card__eyebrow" style={{ color: "var(--btn-color)" }}>
          {body.eyebrow}
        </p>
        <h3 className="card__title">{body.title}</h3>
        <p className="card__lead">{body.lead}</p>

        <div className="card__copy">
          <p>{body.body}</p>
          <p>{body.secondaryBody}</p>
        </div>

        {bulletPoints.length > 0 && (
          <div className="card__details">
            {body.visionLead ? (
              <h4 className="card__subtitle">{body.visionLead}</h4>
            ) : null}

            <ul className="card__list">
              {bulletPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="card__actions">
          <CtaButton onJoinClick={onJoinClick} txt={body.ctaText} />
        </div>
      </div>
    </article>
  );
};
