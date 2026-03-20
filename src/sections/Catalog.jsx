import { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveContent } from "../lib/useActiveContent";
import fallbackPanelImage from "../assets/reclutamiento.png";
import "./Catalog.scss";

gsap.registerPlugin(ScrollTrigger);

export const Catalog = () => {
  const content = useActiveContent();
  const catalog = content?.catalog;
  const root = useRef(null);
  const copyRef = useRef(null);
  const panelRef = useRef(null);
  const [panelSrc, setPanelSrc] = useState(fallbackPanelImage);

  useEffect(() => {
    setPanelSrc(catalog?.panelImg || fallbackPanelImage);
  }, [catalog?.panelImg]);

  // Text: stagger reveal from bottom
  useLayoutEffect(() => {
    if (!copyRef.current || !catalog) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".cat-item", copyRef.current);
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: copyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, copyRef);
    return () => ctx.revert();
  }, [catalog]);

  // Image: float from center (shifts left → to natural right position)
  // starts transparent + desaturated, ends opaque + full color
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el || !catalog) return;
    gsap.set(el, { x: -220, opacity: 0, filter: "saturate(0) blur(10px)" });
    const tween = gsap.to(el, {
      x: 0,
      opacity: 1,
      filter: "saturate(1) blur(0px)",
      duration: 1.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [catalog]);

  if (!catalog) return null;

  const beliefs = catalog.beliefs || [];
  const opportunities = catalog.opportunities || [];

  return (
    <div className="wrap section catalog" ref={root}>
      <div className="catalog__grid">
        {/* Left: rich copy */}
        <div className="catalog__copy" ref={copyRef}>
          <h2 className="cat-item">{catalog.title}</h2>

          <p className="muted cat-item">{catalog.lead}</p>

          {beliefs.length > 0 && (
            <ul className="catalog__beliefs cat-item">
              {beliefs.map((b) => (
                <li key={b}>
                  <span aria-hidden="true">🌿</span> {b}
                </li>
              ))}
            </ul>
          )}

          {catalog.opportunityLead && (
            <p className="muted cat-item">{catalog.opportunityLead}</p>
          )}
          {catalog.opportunityTitle && (
            <strong className="catalog__opp-label cat-item">
              {catalog.opportunityTitle}
            </strong>
          )}

          {opportunities.length > 0 && (
            <ul className="catalog__opportunities cat-item">
              {opportunities.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          )}

          {catalog.closing && (
            <p className="catalog__closing muted cat-item">{catalog.closing}</p>
          )}

          <div className="catalog__actions cat-item">
            <a className="btn" href="#join">
              {catalog.ctaText || content?.hero?.ctaPrimary}
            </a>
          </div>
        </div>

        {/* Right: image with float-from-center animation */}
        <div className="catalog__media" aria-hidden="true" ref={panelRef}>
          <div className="catalog__panel">
            <img
              className="catalog__panelImg"
              src={panelSrc}
              alt="Sunshiner"
              loading="lazy"
              decoding="async"
              onError={() => setPanelSrc(fallbackPanelImage)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
