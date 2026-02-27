import { useRef } from "react";
import { useReveal } from "../lib/useReveal";
import { useActiveContent } from "../lib/useActiveContent";

// const items = [
//   {
//     name: "Omega Balance",
//     desc: "Soporte cardiovascular • Pureza verificada",
//     img: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/0f846c2c-3caf-4e3a-83e5-91cd1b704f62",
//   },
//   {
//     name: "Daily Greens",
//     desc: "Energía suave • Vitaminas y minerales",
//     img: "https://powerhealth.pro/sunshineuniversity/uploads/d6c577e5-b7ad-4e6e-9d61-d96130e29f67_file",
//   },
//   {
//     name: "Collagen+",
//     desc: "Piel • Articulaciones • Recuperación",
//     img: "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/1e303773-cbae-4272-8e03-6f9d07eb90ab",
//   },
//   {
//     name: "Calm Sleep",
//     desc: "Rutina nocturna • Descanso profundo",
//     img: "https://powerhealth.pro/sunshineuniversity/uploads/c302e32c-2361-4ca3-b5ef-dfbe1382e85e_file",
//   },
// ];

export const Supplements = () => {
  const content = useActiveContent();
  const root = useRef(null);
  useReveal(root, { y: 16, stagger: 0.06 });

  if (!content) return;
  const items = content.supplements || [];
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
        {items.map((it) => (
          <article className="card reveal" key={it.name}>
            <img
              className="card__img"
              src={it.img}
              alt={it.name}
              loading="lazy"
              decoding="async"
            />
            <div className="car__body">
              <h3>{it.name}</h3>
              <p className="muted">{it.desc}</p>
              <div className="tags">
                <span className="tag">Bienestar</span>
                <span className="tag">Calidad</span>
                <span className="tag">Confianza</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
