import { useTypewriter } from "../lib/useTypewriter";
import { VideoPopup } from "../ui/VideoPopup";
import "../styles/FeatureSection.css";

export const FeatureSection = ({ data, onJoinClick }) => {
  const { displayText, isComplete } = useTypewriter(data.quotes, 80, 40);

  return (
    <section className="feature">
      <div className="feature__container">
        {/* Imagen con popup de video */}
        <div className="feature__image-wrapper">
          <VideoPopup
            videoUrl={data.videoUrl}
            triggerElement={
              <img
                src={data.image}
                alt={data.imageAlt || "Feature image"}
                className="feature__image"
              />
            }
          />
          <div className="feature__play-icon">▶</div>
        </div>

        {/* Texto con typewriter effect */}
        <div className="feature__content">
          <div className="feature__typewriter-wrapper">
            <p className="feature__typewriter">
              <span className="feature__quote-text">"{displayText}</span>
              <span
                className={`feature__cursor ${isComplete ? "feature__cursor--blink" : ""}`}
              >
                |
              </span>
            </p>
          </div>

          <button className="feature__cta" onClick={onJoinClick}>
            {data.ctaText || "Afíliate ahora"}
          </button>
        </div>
      </div>
    </section>
  );
};
