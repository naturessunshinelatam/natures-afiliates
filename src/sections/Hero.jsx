import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveContent } from "../lib/useActiveContent";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import "./Hero.scss";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const content = useActiveContent();
  const root = useRef(null);
  const titleRef = useRef(null);
  const rightHighlights = [
    "sentirse mejor",
    "tener mas energia",
    "crear habitos saludables",
    "y compartir bienestar con otros.",
  ];

  // Entrance fade-in
  useEffect(() => {
    if (!content || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray(".h__fade"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power2.out" },
      );
    }, root);
    return () => ctx.revert();
  }, [content]);

  // Right-side highlights: one-by-one alternating side entrance
  useEffect(() => {
    if (!content || !root.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".hero__visualItem");
      const triggerEl = root.current?.querySelector(".hero__visualText");
      if (!items.length) return;
      if (!triggerEl) return;

      const setSeparated = () => {
        gsap.set(items, {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -42 : 42),
          filter: "blur(6px)",
        });
      };

      const animateIn = () => {
        gsap.to(items, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.62,
          ease: "power2.out",
          stagger: 0.14,
          overwrite: "auto",
        });
      };

      const animateOut = () => {
        gsap.to(items, {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -42 : 42),
          filter: "blur(6px)",
          duration: 0.42,
          ease: "power2.in",
          stagger: 0.06,
          overwrite: "auto",
        });
      };

      setSeparated();

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top 60%",
        end: "bottom 10%",
        onEnter: animateOut,
        onLeave: animateIn,
        onEnterBack: animateOut,
        onLeaveBack: animateIn,
      });
    }, root);

    return () => ctx.revert();
  }, [content]);

  // Metallic shimmer driven by scroll position
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const onScroll = () => {
      const ratio = Math.min(window.scrollY / window.innerHeight, 1);
      el.style.animationPlayState = "paused";
      el.style.backgroundPositionX = `${ratio * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!content?.hero) return null;

  return (
    <section className="hero" ref={root}>
      <div className="wrap hero__inner">
        {/* Left — copy */}
        <div className="hero__copy">
          <h1 className="h__fade hero__title" ref={titleRef}>
            {content.hero.title}
          </h1>
          <p className="hero__subtitle h__fade">{content.hero.subtitle}</p>

          <div className="hero__cta h__fade">
            <a className="btn" href="#join">
              {content.hero.ctaPrimary}
            </a>
            <WhatsAppButton
              phone={content.join?.contact?.whatsapp}
              label={content.hero.ctaSecondary || "WhatsApp"}
              className="hero__wa"
            />
          </div>
        </div>

        {/* Right — image + diagonal overlay */}
        <div className="hero__visual">
          <div className="hero__diag" aria-hidden="true" />
          <div className="hero__visualText">
            <p className="hero__visualLead">
              Cada vez mas personas estan buscando:
            </p>
            <ul className="hero__visualList">
              {rightHighlights.map((item) => (
                <li key={item} className="hero__visualItem">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img
            className="hero__img"
            src={content.hero.image}
            alt={content.hero.title}
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </section>
  );
};
