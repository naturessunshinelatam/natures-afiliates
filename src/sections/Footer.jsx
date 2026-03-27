import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { useActiveContent } from "../lib/useActiveContent";
import "./Footer.scss";

export const Footer = () => {
  const content = useActiveContent();

  if (!content?.footer) return null;

  const { footer } = content;
  const contact = {
    phone: footer.contact?.phone || content?.join?.contact?.whatsapp || "",
    email: footer.contact?.email || content?.join?.contact?.email || "",
    schedule:
      footer.contact?.schedule || content?.join?.contact?.schedule || "",
    address: footer.contact?.address || "Ciudad de Mexico, CDMX, Mexico",
  };

  const mapEmbedUrl =
    footer.mapEmbedUrl ||
    "https://www.openstreetmap.org/export/embed.html?bbox=-99.1413%2C19.4278%2C-99.1293%2C19.4378&layer=mapnik&marker=19.4326%2C-99.1332";

  const backgroundImage =
    footer.backgroundImage ||
    content?.join?.community?.image ||
    "/imgs/join.png";

  return (
    <footer className="footer">
      <div
        className="footer__main"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="footer__overlay" aria-hidden="true" />
        <div className="footer__grid wrap">
          <section className="footer__contact">
            <h3 className="footer__title">Contacto</h3>
            <ul className="footer__contactList" aria-label="Datos de contacto">
              {contact.phone ? (
                <li>
                  <Phone size={18} aria-hidden="true" />
                  <span>{contact.phone}</span>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <span>{contact.email}</span>
                </li>
              ) : null}
              {contact.address ? (
                <li>
                  <MapPin size={18} aria-hidden="true" />
                  {footer.wazeUrl ? (
                    <a
                      href={footer.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__address-link"
                    >
                      {contact.address}
                    </a>
                  ) : (
                    <span>{contact.address}</span>
                  )}
                </li>
              ) : null}
              {contact.schedule ? (
                <li>
                  <Clock size={18} aria-hidden="true" />
                  <span>{contact.schedule}</span>
                </li>
              ) : null}
            </ul>

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
          </section>

          <section className="footer__mapWrap" aria-label="Mapa de ubicacion">
            <iframe
              className="footer__map"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={footer.mapTitle || "Mapa de ubicacion"}
            />
          </section>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottomInner wrap">
          <div className="footer__brandBlock">
            <div className="footer__brand">{footer.brand}</div>
            <p className="footer__tagline">{footer.tagline}</p>
          </div>

          <div className="footer__certs" aria-label="Certificaciones">
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

          <div className="footer__meta">
            <span className="fine">
              © {new Date().getFullYear()} {footer.brand}
            </span>
            <span className="fine">
              {footer.privacyText || "Politica de privacidad"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
