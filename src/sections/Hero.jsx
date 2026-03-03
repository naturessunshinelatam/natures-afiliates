import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useActiveContent } from "../lib/useActiveContent";
import "./Hero.scss";

const imgUrls = [
  {
    id: "MX",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/0f846c2c-3caf-4e3a-83e5-91cd1b704f62",
  },
  {
    id: "CO",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
  },
  {
    id: "EC",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
  },
  {
    id: "GT",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
  },
  {
    id: "SV",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
  },
  {
    id: "HN",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
  },
  {
    id: "PA",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
  },
  {
    id: "DO",
    url: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
  },
];

export const Hero = () => {
  const content = useActiveContent();
  const root = useRef(null);
  const { countryCode } = useSelector((state) => state.geo);

  useEffect(() => {
    if (!content || !root.current) return;

    const ctx = gsap.context(() => {
      const fades = gsap.utils.toArray(".h__fade");

      gsap.fromTo(
        fades,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" },
      );

      gsap.to(".h__blob", {
        y: 10,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, [content]);

  if (!content || !content.hero) return null;

  return (
    <div className="wrap hero" ref={root}>
      <div className="hero__copy">
        <p className="pill h__fade"> Paz • Armonía • Salud</p>
        <h1 className="h__fade">{content.hero.title}</h1>
        <p className="muted h__fade">{content.hero.subtitle}</p>
        <div className="hero__cta h__fade">
          <a className="btn" href="#join">
            {content.hero.ctaPrimary}
          </a>
          <a className="btn" href="#sponsorship">
            {content.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__card h__blob">
          <img
            className="hero__img"
            // src={imgUrls.find((i) => i.id === countryCode)?.url}
            src={content.hero.image}
            alt="suplementos"
            loading="eager"
            decoding="sync"
          />
          <div className="hero_cardFoot">
            <strong>Natures-afiliates</strong>
            <span className="muted">Oportunidad • Bienestar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
