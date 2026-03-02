import "./Join.scss";

export const Join = () => {
  return (
    <div className="wrap section join">
      <header className="section__head">
        <h2>Afíliate</h2>
        <p className="muted">
          Completa el formulario y recibe información para comenzar.
        </p>
      </header>

      <div className="join__grid">
        <div className="join__box">
          <div id="mc_embed_signup" className="mc">
            <form
              action="https://naturessunshinelatam.us12.list-manage.com/subscribe/post?u=98c81c00200b439824130a329&amp;id=c0296ad042&amp;f_id=005c6ae9f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_self"
              noValidate
            >
              <div id="mc_embed_signup_scroll">
                <h2>Suscríbete</h2>
                <div className="indicates-required">
                  <span className="asterisk">*</span> indica requerido
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">
                    Dirección de correo electrónico{" "}
                    <span className="asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                    required
                    defaultValue=""
                  />
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-PAIS">País</label>
                  <select name="PAIS" id="mce-PAIS" defaultValue="">
                    <option value=""></option>
                    <option value="Mexico">Mexico</option>
                    <option value="Colombia">Colombia</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Republica Dominicana">
                      Republica Dominicana
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Guatemala">Guatemala</option>
                  </select>
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-LNAME">Apellido</label>
                  <input
                    type="text"
                    name="LNAME"
                    className="text"
                    id="mce-LNAME"
                    defaultValue=""
                  />
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-FNAME">Nombre</label>
                  <input
                    type="text"
                    name="FNAME"
                    className="text"
                    id="mce-FNAME"
                    defaultValue=""
                  />
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-TELEFONO">Teléfono</label>
                  <input
                    type="number"
                    name="TELEFONO"
                    className="number"
                    id="mce-TELEFONO"
                    defaultValue=""
                  />
                </div>

                <div
                  id="mergeRow-gdpr"
                  className="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group"
                >
                  <div className="content__gdpr">
                    <label>Permisos de Marketing</label>
                    <p>
                      Por favor selecciona las formas en que quieras saber más:
                    </p>
                    <fieldset
                      className="mc_fieldset gdprRequired mc-field-group"
                      name="interestgroup_field"
                    >
                      <label className="checkbox subfield" htmlFor="gdpr_90974">
                        <input
                          type="checkbox"
                          id="gdpr_90974"
                          name="gdpr[90974]"
                          className="gdpr"
                          value="Y"
                        />
                        <span>Email</span>
                      </label>
                    </fieldset>
                    <p className="fine muted">
                      Puedes darte de baja en cualquier momento desde el enlace
                      en el pie de nuestros correos.
                    </p>
                  </div>

                  <div className="content__gdprLegal">
                    <p className="fine muted">
                      We use Mailchimp as our marketing platform. By clicking
                      below to subscribe, you acknowledge that your information
                      will be transferred to Mailchimp for processing.{" "}
                      <a
                        href="https://mailchimp.com/legal/terms"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div id="mce-responses" className="clear">
                  <div
                    className="response"
                    id="mce-error-response"
                    style={{ display: "none" }}
                  ></div>
                  <div
                    className="response"
                    id="mce-success-response"
                    style={{ display: "none" }}
                  ></div>
                </div>

                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-5000px" }}
                >
                  <input
                    type="text"
                    name="b_98c81c00200b439824130a329_c0296ad042"
                    tabIndex={-1}
                    defaultValue=""
                  />
                </div>

                <div className="clear">
                  <input
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                    value="Afiliarme"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <aside className="join__side">
          <div className="sideCard">
            <h3>Contacto rápido</h3>
            <p className="muted">consultores@natures-afiliates.com</p>
            <p className="muted">WhatsApp: +52 000 000 0000</p>
            <p className="muted">Lun–Vie • 9:00–18:00</p>
          </div>
          <div className="sideCard sideCard--grad">
            <h3>¿Qué sigue?</h3>
            <p className="muted">
              Te enviaremos información del plan y cómo iniciar con tu kit.
            </p>
            <a className="btn btn--ghost" href="#catalog">
              Descargar catálogo
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};
