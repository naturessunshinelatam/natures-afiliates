import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveContent } from "../lib/useActiveContent";
import "./ChloroFeelBanner.scss";
import { Card } from "../ui/Card/Card";

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
            toggleActions: "restart none none restart",
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
        className="cfb__bgSide"
        style={{ backgroundImage: `url(${banner.backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="cfb__overlay" aria-hidden="true" />
      <div className="wrap cfb__wrap">
        <div className="cfb__content">
          <Card
            body={banner}
            className="cfb__card cfb__panel cfb__reveal"
            onJoinClick={onJoinClick}
          />
        </div>
      </div>
    </section>
  );
};
