import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <div className="footer__brand">Natures-afiliates</div>
          <p className="muted">
            Bienestar con calma. Crecimiento con propósito.
          </p>
        </div>
        <div>
          <h4>Redes</h4>
          <div className="footer__links">
            <a href="#" className="link">
              Instagram
            </a>
            <a href="#" className="link">
              Facebook
            </a>
            <a href="#" className="link">
              YouTube
            </a>
            <a href="#" className="link">
              LinkedIn
            </a>
          </div>
        </div>
        <div>
          <h4>Certificaciones</h4>
          <ul className="muted footer__list">
            <li>GMP</li>
            <li>ISO 22000</li>
            <li>Certifiación internacional(placeholder)</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="muted fine">
          © {new Date().getFullYear()} natures-afiliates.
        </span>
      </div>
    </footer>
  );
};
