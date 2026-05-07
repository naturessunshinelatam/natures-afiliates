import { useMemo, useState } from "react";

const getEmbedData = (url) => {
  if (!url) {
    return { url: "", isDirect: false, isShort: false };
  }

  if (url.includes("youtube.com/shorts/")) {
    const videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0] || "";
    return {
      url: `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&fs=1&playsinline=1`,
      isDirect: false,
      isShort: true,
    };
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    return {
      url: `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`,
      isDirect: false,
      isShort: false,
    };
  }

  if (url.includes("youtube.com/watch")) {
    const videoId = new URL(url).searchParams.get("v") || "";
    return {
      url: `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`,
      isDirect: false,
      isShort: false,
    };
  }

  if (url.includes("youtube.com/embed/")) {
    const hasParams = url.includes("?");
    const separator = hasParams ? "&" : "?";
    return {
      url: `${url}${separator}autoplay=1&modestbranding=1&rel=0`,
      isDirect: false,
      isShort: false,
    };
  }

  return {
    url,
    isDirect: true,
    isShort: false,
  };
};

export const InlineVideoPlayer = ({
  videoUrl,
  previewImage,
  imageAlt = "Feature image",
  isShort,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const rawEmbedData = useMemo(() => getEmbedData(videoUrl), [videoUrl]);
  const embedData =
    isShort !== undefined ? { ...rawEmbedData, isShort } : rawEmbedData;

  const handlePlay = () => {
    if (!videoUrl) return;
    setIsPlaying(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePlay();
    }
  };

  if (!videoUrl) {
    return (
      <div className="feature__video-trigger">
        <img src={previewImage} alt={imageAlt} className="feature__image" />
      </div>
    );
  }

  return (
    <div className="feature__video-trigger">
      {!isPlaying ? (
        <div
          className="inline-video-player__trigger"
          role="button"
          tabIndex={0}
          onClick={handlePlay}
          onKeyDown={handleKeyDown}
          aria-label="Reproducir video"
        >
          <img src={previewImage} alt={imageAlt} className="feature__image" />
          <div className="feature__video-overlay" aria-hidden="true">
            <div className="feature__play-icon">▶</div>
          </div>
        </div>
      ) : embedData.isDirect ? (
        <video
          className={`inline-video-player__video ${
            embedData.isShort ? "inline-video-player__video--short" : ""
          }`}
          controls
          autoPlay
          playsInline
        >
          <source src={embedData.url} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      ) : (
        <iframe
          className={`inline-video-player__iframe ${
            embedData.isShort ? "inline-video-player__iframe--short" : ""
          }`}
          src={embedData.url}
          title="Video"
          frameBorder="0"
          sandbox="allow-same-origin allow-scripts allow-popups allow-presentation allow-popups-to-escape-sandbox"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      )}
    </div>
  );
};
