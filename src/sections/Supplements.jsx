import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "../lib/useReveal";
import { useActiveContent } from "../lib/useActiveContent";
import "./Supplements.scss";

gsap.registerPlugin(ScrollTrigger);

export const Supplements = () => {
  const content = useActiveContent();
  const root = useRef(null);
  const [flippedIndex, setFlippedIndex] = useState(null);
  useReveal(root, { y: 16, stagger: 0.06 });
  const items = content?.supplements || [];

  // Hover animations for cards and tags
  // Using useEffect (not useLayoutEffect) for external DOM event listeners
  // This ensures the DOM is fully rendered before attaching handlers
  useEffect(() => {
    const el = root.current;
    if (!el || !items.length) return;

    // Small delay to ensure DOM is completely ready
    const timeoutId = requestAnimationFrame(() => {
      const cleanup = [];
      const cards = Array.from(el.querySelectorAll(".supp-card"));

      cards.forEach((card) => {
        const tags = card.querySelectorAll(".supp-tag");

        const enter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.01,
            duration: 0.25,
            ease: "power2.out",
          });
          gsap.to(tags, {
            y: -2,
            scale: 1.03,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.22,
            ease: "power2.out",
          });
          gsap.to(tags, {
            y: 0,
            scale: 1,
            duration: 0.18,
            stagger: 0.02,
            ease: "power2.out",
          });
        };

        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);

        cleanup.push(() => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
        });
      });

      return () => {
        cleanup.forEach((fn) => fn());
      };
    });

    return () => {
      cancelAnimationFrame(timeoutId);
    };
  }, [items.length]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !items.length) return;

    const inners = Array.from(el.querySelectorAll(".supp-flip__inner"));

    inners.forEach((inner, index) => {
      gsap.to(inner, {
        rotateY: flippedIndex === index ? 180 : 0,
        duration: 0.45,
        ease: "power2.out",
      });
    });
  }, [flippedIndex, items.length]);

  if (!content) return;
  if (!items.length) return null;

  return (
    <div className="wrap section" ref={root}>
      <header className="section__head">
        <h2 className="reveal">
          {content.supplementsTitle || "Suplementos destacados"}
        </h2>
        <p className="muted reveal">{content.supplementsSubtitle || ""}</p>
      </header>

      <div className="grid">
        {items.map((it, index) => (
          <article
            className={`card reveal supp-card ${flippedIndex === index ? "supp-card--flipped" : ""}`}
            key={it.name}
          >
            <div
              className="supp-flip"
              tabIndex={0}
              role="button"
              aria-pressed={flippedIndex === index}
              aria-label={`Ver detalle de ${it.name}`}
              onClick={() =>
                setFlippedIndex((prev) => (prev === index ? null : index))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setFlippedIndex((prev) => (prev === index ? null : index));
                }
              }}
            >
              <div className="supp-flip__inner">
                <div className="supp-flip__face supp-flip__face--front">
                  <img
                    className="card__img"
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="supp-flip__face supp-flip__face--back">
                  <p className="supp-flip__kicker">
                    {it.featuredTitle || "Producto estrella"}
                  </p>
                  <h4>{it.name}</h4>
                  <p className="muted">{it.featuredDesc || it.desc}</p>
                </div>
              </div>
            </div>
            <div className="card__body">
              <h3>{it.name}</h3>
              <p className="muted">{it.desc}</p>
              <div className="tags">
                {(it.tags?.length
                  ? it.tags
                  : ["Bienestar", "Calidad", "Confianza"]
                ).map((tag) => (
                  <span className="tag supp-tag" key={`${it.name}-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="hero__cta h__fade">
        <a className="btn" href="#join">
          {content.hero.ctaPrimary}
        </a>
      </div>
    </div>
  );
};
