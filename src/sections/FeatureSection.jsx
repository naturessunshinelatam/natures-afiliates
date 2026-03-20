import { useTypewriter } from "../lib/useTypewriter";
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
  const { displayText, isComplete } = useTypewriter(data.quotes, 80, 40);
  const previewImage = data.image || getYouTubeThumb(data.videoUrl);

  return (
    <section className="feature">
      <h1>{data.title}</h1>
      <h3>{data.subTitle}</h3>
      <p>{data.descTitle}</p>
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
