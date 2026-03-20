import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveContent } from "../lib/useActiveContent";
import "./ChloroFeelBanner.scss";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX = {
  bgY: 1,
  bgScale: 1.05,
  topY: -18,
  topX: 4,
  bottomYFrom: -2,
  bottomYTo: 10,
  bottomXFrom: 18,
  bottomXTo: -18,
};

const FLOATING = {
  topY: 10,
  bottomY: 14,
};

export const ChloroFeelBanner = () => {
  const content = useActiveContent();
  const root = useRef(null);
  const titleRef = useRef(null);
  const banner = content?.chloroFeelBanner;

  useLayoutEffect(() => {
    if (!root.current || !banner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cfb__cinematic",
        {
          clipPath: "polygon(-8% 0, 100% 0, 100% 100%, -8% 100%)",
          opacity: 0.94,
        },
        {
          clipPath: "polygon(104% 0, 128% 0, 96% 100%, 72% 100%)",
          opacity: 0,
          duration: 1.15,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: root.current,
            start: "top 83%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".cfb__reveal",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".cfb__card",
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.95,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".cfb__title",
        { opacity: 0, y: 24, filter: "blur(10px)", letterSpacing: "0.04em" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          letterSpacing: "0em",
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(".cfb__bg", {
        yPercent: PARALLAX.bgY,
        scale: PARALLAX.bgScale,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.65,
        },
      });

      gsap.to(".cfb__card--top", {
        yPercent: PARALLAX.topY,
        xPercent: PARALLAX.topX,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.65,
        },
      });

      // Bottom card crosses from right to left while scrolling
      gsap.fromTo(
        ".cfb__card--bottom",
        {
          xPercent: PARALLAX.bottomXFrom,
          yPercent: PARALLAX.bottomYFrom,
        },
        {
          xPercent: PARALLAX.bottomXTo,
          yPercent: PARALLAX.bottomYTo,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        },
      );

      // Continuous floating motion layered above scroll parallax for a dynamic feel
      gsap.to(".cfb__card-float--top", {
        y: -FLOATING.topY,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cfb__card-float--bottom", {
        y: FLOATING.bottomY,
        duration: 4.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, [banner]);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      el.style.animationPlayState = "paused";
      el.style.backgroundPositionX = `${24 + ratio * 54}%`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!banner) return null;

  return (
    <section className="cfb" ref={root}>
      <div className="cfb__cinematic" aria-hidden="true" />
      <div
        className="cfb__bg"
        style={{ backgroundImage: `url(${banner.backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="wrap cfb__wrap">
        <div className="cfb__stack">
          <article className="cfb__card cfb__card--top">
            <div className="cfb__card-float cfb__card-float--top">
              <p className="cfb__eyebrow cfb__reveal">{banner.eyebrow}</p>
              <h2 className="cfb__title cfb__reveal" ref={titleRef}>
                {banner.title}
              </h2>
              <p className="cfb__lead cfb__reveal">{banner.lead}</p>
            </div>
          </article>

          <article className="cfb__card cfb__card--bottom">
            <div className="cfb__card-float cfb__card-float--bottom">
              <h3 className="cfb__mission cfb__reveal">{banner.mission}</h3>
              <p className="cfb__body cfb__reveal">{banner.communityLine}</p>
              <p className="cfb__body cfb__reveal">{banner.opportunityLine}</p>
              <a className="btn cfb__cta cfb__reveal" href="#join">
                {banner.ctaText}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
