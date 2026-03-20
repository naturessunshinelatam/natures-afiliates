import { useState } from "react";
import "../styles/VideoPopup.css";

/**
 * Detecta si es un YouTube short o video normal y adapta el iframe
 */
const getYouTubeEmbedUrl = (url) => {
  // Detectar si es un YouTube short
  if (url.includes("youtube.com/shorts/")) {
    // Extraer el video ID
    let videoId = "";
    if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1].split("?")[0];
    }
    return {
      url: `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&fs=1&playsinline=1`,
      isShort: true,
    };
  }

  // URL corta de YouTube (generalmente video normal)
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return {
      url: `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`,
      isShort: false,
    };
  }

  // URL de YouTube normal
  if (url.includes("youtube.com/watch")) {
    const videoId = new URL(url).searchParams.get("v");
    return {
      url: `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`,
      isShort: false,
    };
  }

  // YouTube embed ya proporcionado
  if (url.includes("youtube.com/embed/")) {
    const hasParams = url.includes("?");
    const separator = hasParams ? "&" : "?";
    const embedUrl = url + separator + "autoplay=1&modestbranding=1&rel=0";
    return {
      url: embedUrl,
      isShort: false,
    };
  }

  // Video directo (MP4, WebM, etc)
  return {
    url: url,
    isShort: false,
    isDirect: true,
  };
};

export const VideoPopup = ({ videoUrl, triggerElement = null, isShort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rawEmbed = getYouTubeEmbedUrl(videoUrl);
  // Allow caller to override short detection (e.g. for local vertical MP4)
  const embedData = isShort !== undefined ? { ...rawEmbed, isShort } : rawEmbed;

  const handleBackdropClick = (e) => {
    // Solo cerrar si se hace clic directamente en el backdrop, no en el contenido
    const isBackdrop = e.target === e.currentTarget;
    if (isBackdrop) {
      setIsOpen(false);
    }
  };

  const handleTriggerKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
      setIsLoaded(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsLoaded(false);
  };

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {triggerElement ? (
        <div
          className="video-popup-trigger"
          onClick={handleOpen}
          onKeyDown={handleTriggerKeyDown}
          role="button"
          tabIndex={0}
        >
          {triggerElement}
        </div>
      ) : null}

      {isOpen && (
        <div className="video-popup-backdrop" onClick={handleBackdropClick}>
          <div
            className={`video-popup-container ${
              embedData.isShort
                ? "video-popup-container--short"
                : "video-popup-container--wide"
            }`}
          >
            <button
              className="video-popup-close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar video"
            >
              ✕
            </button>

            {embedData.isDirect ? (
              <video
                className={`video-popup-video ${
                  embedData.isShort ? "video-popup-video--short" : ""
                }`}
                controls
                autoPlay
              >
                <source src={embedData.url} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            ) : (
              <>
                {!isLoaded && (
                  <div className="video-popup-loader">
                    <div className="video-popup-loader__spinner"></div>
                    <p>Cargando video...</p>
                  </div>
                )}
                <iframe
                  className={`video-popup-iframe ${
                    embedData.isShort ? "video-popup-iframe--short" : ""
                  }`}
                  src={embedData.url}
                  title="Video"
                  frameBorder="0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-presentation allow-popups-to-escape-sandbox"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={handleIframeLoad}
                ></iframe>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
