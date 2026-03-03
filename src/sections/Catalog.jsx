import { useEffect, useRef, useState } from "react";
import { useReveal } from "../lib/useReveal";
import { useActiveContent } from "../lib/useActiveContent";
import fallbackPanelImage from "../assets/reclutamiento.png";
import "./Catalog.scss";

export const Catalog = () => {
  const content = useActiveContent();
  const catalog = content?.catalog;
  const root = useRef(null);
  const [panelSrc, setPanelSrc] = useState(fallbackPanelImage);
  useReveal(root);

  useEffect(() => {
    setPanelSrc(catalog?.panelImg || fallbackPanelImage);
  }, [catalog?.panelImg]);

  if (!catalog) return null;

  const pdfHref = catalog.pdfUrl || "/catalogo.pdf";

  return (
    <div className="wrap section split catalog" ref={root}>
      <div className="split__copy catalog__copy">
        <h2 className="reveal">{catalog.title || "Catalogo"}</h2>
        <p className="muted reveal">{catalog.text || ""}</p>
        <div className="catalog__actions reveal">
          <a
            href={pdfHref}
            className="btn catalog__download"
            download
            target="_blank"
          >
            <span>Descargar guia PDF</span>
            <span className="catalog__ctaIcon" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
      <div className="split__media reveal" aria-hidden="true">
        <div className="panelImg catalog__panel">
          <img
            className="catalog__panelImg"
            src={panelSrc}
            alt="Vista previa del catálogo"
            style={{ height: "400px" }}
            loading="lazy"
            decoding="async"
            onError={() => setPanelSrc(fallbackPanelImage)}
          />
        </div>
      </div>
    </div>
  );
};
