import { useEffect, useMemo, useRef, useState } from "react";
import { useActiveContent } from "../lib/useActiveContent";
import { StarRating } from "../ui/StarRating";
import { TestimonialForm } from "./TestimonialForm";
import "./Testimonials.scss";

export const Testimonials = () => {
  const content = useActiveContent();
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  // Get top 7 best-rated testimonials
  const items = useMemo(() => {
    const testimonials = content?.testimonials || [];
    return [...testimonials]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 7);
  }, [content]);

  const slide = (dir) =>
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  // Drag mouse touch
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let down = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e) => {
      down = true;
      el.classList.add("rail--drag");
      startX = "touches" in e ? e.touches[0].pageX : e.pageX;
      startLeft = el.scrollLeft;
    };

    const onMove = (e) => {
      if (!down) return;
      const x = "touches" in e ? e.touches[0].pageX : e.pageX;
      const dx = x - startX;
      el.scrollLeft = startLeft - dx;
    };

    const onUp = () => {
      down = false;
      el.classList.remove("rail--drag");
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  // Detect active item on scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll(".quote"));
      if (cards.length === 0) return;

      const elRect = el.getBoundingClientRect();
      const center = elRect.left + elRect.width / 2;

      let best = 0;
      let bestDist = Infinity;

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goDot = (i) => {
    const el = ref.current;
    if (!el) return;

    const card = el.querySelectorAll(".quote")[i];
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  if (!content) return null;

  return (
    <div className="wrap section">
      <header className="section__head row">
        <div>
          <h2>{content.testimonialsTitle || "Testimonios"}</h2>
          <p className="muted">{content.testimonialsSubtitle || ""}</p>
        </div>
        <div className="row__actions">
          <button
            className="iconBtn"
            onClick={() => slide(-1)}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            className="iconBtn"
            onClick={() => slide(1)}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </header>

      {/* Testimonios carousel */}
      {items.length > 0 && (
        <>
          <div className="rail" ref={ref}>
            {items.map((x) => (
              <figure className="quote testimonial" key={x.id || x.name}>
                <blockquote>"{x.text}"</blockquote>
                <div className="quote__footer">
                  <div>
                    <strong>{x.name}</strong>
                    {x.role && <span className="muted">{x.role}</span>}
                  </div>
                  {x.rating && (
                    <div className="quote__rating">
                      <StarRating rating={x.rating} readOnly size="sm" />
                    </div>
                  )}
                </div>
              </figure>
            ))}
          </div>
        </>
      )}

      {/* Submit Testimonial Form */}
      <TestimonialForm />
    </div>
  );
};
