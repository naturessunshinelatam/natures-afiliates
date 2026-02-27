import { useRef } from "react";
import { useReveal } from "../lib/useReveal";
import { useActiveContent } from "../lib/useActiveContent";

export const Catalog = () => {
  const content = useActiveContent();
  const root = useRef(null);
  useReveal(root);

  if (!content || !content.catalog) return null;

  return (
    <div className="wrap section split" ref={root}>
      <div className="split__copy">
        <h2 className="reveal">{content.catalog.title || "Catalogo"}</h2>
        <p className="mute reveal">{content.catalog.text || ""}</p>
        <a
          href={content.catalog.url || "/catalogo.pdf"}
          className="btn reveal"
          // target="_blank"
          download
        >
          Descargar PDF
        </a>
        <p className="fine muted reveal">
          Pon el archivo <code>public/catalog.pdf</code>
        </p>
      </div>
      <div className="split__media reveal" aria-hidden="true">
        <div
          className="panelImg"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(25,212,191,.18)),
          rgba(56,189,248,.16)), url("${content.catalog.panelImg}")`,
          }}
        ></div>
      </div>
    </div>
  );
};
