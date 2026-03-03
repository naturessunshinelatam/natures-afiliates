import { Instagram, Facebook, Youtube } from "lucide-react";
import { useActiveContent } from "../lib/useActiveContent";
import "./Footer.scss";

export const Footer = () => {
  const content = useActiveContent();

  if (!content?.footer) return null;

  const { footer } = content;

  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__section">
          <div className="footer__brand">{footer.brand}</div>
          <p className="muted">{footer.tagline}</p>
        </div>

        {/* Social Networks */}
        <div className="footer__section footer__section--center">
          <h4>Siguenos en nuestras redes sociales</h4>
          <div className="footer__links">
            {footer.social.instagram && (
              <a
                href={footer.social.instagram}
                className="link footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            {footer.social.facebook && (
              <a
                href={footer.social.facebook}
                className="link footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            )}
            {footer.social.youtube && (
              <a
                href={footer.social.youtube}
                className="link footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Certifications */}
        <div className="footer__section">
          <h4>Producto certificado</h4>
          <div className="footer__certs">
            {footer.certifications?.map((cert, index) => {
              const certImage = (
                <img
                  src={cert.img}
                  alt={cert.name}
                  className="footer__cert-img"
                />
              );

              return cert.url ? (
                <a
                  key={index}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__cert-link"
                >
                  {certImage}
                </a>
              ) : (
                <div key={index} className="footer__cert-item">
                  {certImage}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="muted fine">
          © {new Date().getFullYear()} {footer.brand}.
        </span>
      </div>
    </footer>
  );
};
