import { useMultiLineTypewriter } from "../lib/useMultiLineTypewriter";
import { InlineVideoPlayer } from "../ui/InlineVideoPlayer";
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
  const { displayedLines, currentLineText, isComplete } =
    useMultiLineTypewriter(data.quotes, 30, 500, 9999999);
  const previewImage = data.image || getYouTubeThumb(data.videoUrl);

  return (
    <section className="feature">
      <div className="feature__header">
        <h1 className="feature__title">{data.title}</h1>
        <h3 className="feature__subtitle">{data.subTitle}</h3>
        <p className="feature__descTitle">{data.descTitle}</p>
      </div>

      <div className="feature__container">
        {/* Video inline en la tarjeta izquierda */}
        <div className="feature__image-wrapper">
          <InlineVideoPlayer
            videoUrl={data.videoUrl}
            isShort={data.videoIsShort}
            previewImage={previewImage}
            imageAlt={data.imageAlt || "Feature image"}
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
