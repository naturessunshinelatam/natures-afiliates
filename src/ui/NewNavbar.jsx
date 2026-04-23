import { useEffect, useMemo, useState } from "react";
import { NSPLogo } from "./NSPLogo";
import { useActiveContent } from "../lib/useActiveContent";
import "./NewNavBar.scss";

const MOBILE_NAV_MAX_WIDTH = 989;

const links = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "¿Qué es?" },
  { id: "feature", label: "Historia" },
  { id: "chloro-feel", label: "Chloro-feel" },
  { id: "steps", label: "Pasos" },
  { id: "join", label: "Contacto" },
];

export const NewNavbar = () => {
  const content = useActiveContent();
  const phone =
    content?.footer?.contact?.phone || content?.join?.contact?.whatsapp || "";

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  const sections = useMemo(
    () => links.map((l) => document.getElementById(l.id)).filter(Boolean),
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_NAV_MAX_WIDTH) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveId(id);
    setIsOpen(false);
  };

  return (
    <header className={`new-nav ${isScrolled ? "new-nav--scrolled" : ""}`}>
      <nav className="new-nav__inner" aria-label="Secciones principales">
        <button
          type="button"
          className="new-nav__brand"
          onClick={() => goToSection("hero")}
          aria-label="Ir al inicio"
        >
          <NSPLogo
            className="new-nav__brandLogo"
            color="var(--main_text_light_bg)"
          />
          <span className="new-nav__brandText">Natures Sunshine</span>
        </button>

        <button
          type="button"
          className="new-nav__menuToggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="new-nav-mobile-menu"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          <span
            className={`new-nav__hamburger ${isOpen ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <span className="new-nav__hamburgerLine" />
            <span className="new-nav__hamburgerLine" />
            <span className="new-nav__hamburgerLine" />
          </span>
        </button>

        <div
          className="new-nav__links"
          role="tablist"
          aria-label="Ir a sección"
        >
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`new-nav__link ${activeId === link.id ? "is-active" : ""}`}
              onClick={() => goToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="new-nav__phone"
          onClick={() => goToSection("join")}
        >
          {phone}
        </button>
      </nav>

      {isOpen && (
        <div id="new-nav-mobile-menu" className="new-nav__mobilePanel">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`new-nav__mobileLink ${activeId === link.id ? "is-active" : ""}`}
              onClick={() => goToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
