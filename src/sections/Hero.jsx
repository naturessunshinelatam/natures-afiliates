import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useActiveContent } from "../lib/useActiveContent";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import "./Hero.scss";

export const Hero = () => {
  const content = useActiveContent();
  const root = useRef(null);
  const titleRef = useRef(null);

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
