import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveContent } from "../lib/useActiveContent";
import "./ChloroFeelBanner.scss";

gsap.registerPlugin(ScrollTrigger);

export const ChloroFeelBanner = ({ onJoinClick }) => {
  const content = useActiveContent();
  const root = useRef(null);
  const banner = content?.chloroFeelBanner;

  useLayoutEffect(() => {
    if (!root.current || !banner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cfb__reveal",
        { opacity: 0, y: 32, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "restart pause none pause",
          },
        },
      );
      gsap.to(".cfb__bg", {
        yPercent: 7,
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.fromTo(
        ".cfb__mediaImage--product",
        {
          yPercent: 22,
          xPercent: -6,
          rotate: 6,
          scale: 0.94,
          x: -200,
        },
        {
          yPercent: -10,
          xPercent: 6,
          rotate: -4,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        },
      );
      gsap.fromTo(
        ".cfb__glow",
        { xPercent: -14, opacity: 0.25 },
        {
          xPercent: 14,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
      gsap.to(".cfb__panel", {
        y: -8,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, [banner]);

  if (!banner) return null;

  return (
    <section className="cfb" ref={root}>
      <div
        className="cfb__bg"
        style={{ backgroundImage: `url(${banner.backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="cfb__overlay" aria-hidden="true" />
      <div className="cfb__glow" aria-hidden="true" />
      <div className="wrap cfb__wrap">
        <img
          src={banner.imgBestSeller}
          alt=""
          className="cfb__mediaImage cfb__mediaImage--product"
        />
        <article className="cfb__panel">
          <p className="cfb__eyebrow cfb__reveal">{banner.eyebrow}</p>
          <h2 className="cfb__title cfb__reveal">{banner.title}</h2>
          <p className="cfb__lead cfb__reveal">{banner.lead}</p>
          <p className="cfb__body cfb__reveal">{banner.body}</p>
          <p className="cfb__body cfb__reveal">{banner.secondaryBody}</p>

          <ul className="cfb__bullets">
            <li className="cfb__bullet cfb__reveal">{banner.mission}</li>
            <li className="cfb__bullet cfb__reveal">{banner.communityLine}</li>
            <li className="cfb__bullet cfb__reveal">
              {banner.opportunityLine}
            </li>
          </ul>

          <button className="btn cfb__cta cfb__reveal" onClick={onJoinClick}>
            {banner.ctaText}
          </button>
        </article>
      </div>
    </section>
  );
};
