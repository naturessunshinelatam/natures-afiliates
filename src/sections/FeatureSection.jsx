import { useMultiLineTypewriter } from "../lib/useMultiLineTypewriter";
import { VideoPopup } from "../ui/VideoPopup";
import "./FeatureSection.scss";

const getYouTubeThumb = (url) => {
  if (!url) return "";
  let videoId = "";

  if (url.includes("youtube.com/shorts/")) {
    videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0] || "";
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  } else if (url.includes("youtube.com/watch")) {
    videoId = new URL(url).searchParams.get("v") || "";
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] || "";
  }

  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
};

export const FeatureSection = ({ data, onJoinClick }) => {
  const { displayedLines, currentLineText, isComplete } = useMultiLineTypewriter(
    data.quotes,
    70,
    600,
    3000
  );
  const previewImage = data.image || getYouTubeThumb(data.videoUrl);

  return (
    <section className="feature">
      <div className="feature__header">
        <h1 className="feature__title">{data.title}</h1>
        <h3 className="feature__subtitle">{data.subTitle}</h3>
        <p className="feature__descTitle">{data.descTitle}</p>
      </div>

      <div className="feature__container">
        {/* Imagen con popup de video */}
        <div className="feature__image-wrapper">
          <VideoPopup
            videoUrl={data.videoUrl}
            isShort={data.videoIsShort}
            triggerElement={
              <div className="feature__video-trigger">
                <img
                  src={previewImage}
                  alt={data.imageAlt || "Feature image"}
                  className="feature__image"
                />
                <div className="feature__video-overlay" aria-hidden="true">
                  <div className="feature__play-icon">▶</div>
                </div>
              </div>
            }
          />
        </div>

        {/* Quotes con typewriter effect */}
        <div className="feature__content">
          <div className="feature__quotes-wrapper">
            {displayedLines.map((line, idx) => (
              <div key={idx} className="feature__quote-line">
                <span className="feature__quote-icon">✓</span>
                <p className="feature__quote-text">{line}</p>
              </div>
            ))}

            {currentLineText && (
              <div className="feature__quote-line feature__quote-line--active">
                <span className="feature__quote-icon">✓</span>
                <p className="feature__quote-text">
                  <span>{currentLineText}</span>
                  <span className="feature__cursor">|</span>
                </p>
              </div>
            )}
          </div>

          <button className="feature__cta" onClick={onJoinClick}>
            {data.ctaText || "Afíliate ahora"}
          </button>
        </div>
      </div>
    </section>
  );
};
