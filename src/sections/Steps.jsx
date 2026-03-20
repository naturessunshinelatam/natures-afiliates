import { useRef, useCallback } from "react";
import { useActiveContent } from "../lib/useActiveContent";
import "./Steps.scss";

export const Steps = () => {
  const content = useActiveContent();
  const steps = content?.steps;

  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = useCallback((e) => {
    const el = trackRef.current;
    drag.current = {
      active: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    el.classList.add("steps__track--grabbing");
  }, []);

  const onMouseLeave = useCallback(() => {
    drag.current.active = false;
    trackRef.current?.classList.remove("steps__track--grabbing");
  }, []);

  const onMouseUp = useCallback(() => {
    drag.current.active = false;
    trackRef.current?.classList.remove("steps__track--grabbing");
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const el = trackRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - drag.current.startX) * 1.25;
    el.scrollLeft = drag.current.scrollLeft - walk;
  }, []);

  if (!steps) return null;

  return (
    <div className="steps">
      <div className="wrap">
        <header className="steps__header">
          <h2 className="steps__title">{steps.title}</h2>
          {steps.subtitle && (
            <p className="steps__subtitle">{steps.subtitle}</p>
          )}
          {steps.description && (
            <p className="steps__description">{steps.description}</p>
          )}
        </header>
      </div>

      <div className="steps__overflow">
        <div
          className="steps__track"
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <div className="steps__track-inner wrap">
            {steps.items.map((item) => (
              <article className="steps__card" key={item.step}>
                <span className="steps__badge">
                  {String(item.step).padStart(2, "0")}
                </span>
                <h3 className="steps__card-title">{item.title}</h3>
                <p className="steps__card-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <footer className="steps__footer">
          <a href="#join" className="btn steps__cta">
            {steps.cta}
          </a>
        </footer>
      </div>
    </div>
  );
};
