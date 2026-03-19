export const JoinForm = () => {
  return (
    <div id="mc_embed_signup" className="mc">
      <form
        action="https://naturessunshinelatam.us12.list-manage.com/subscribe/post?u=98c81c00200b439824130a329&id=c0296ad042&v_id=7197&f_id=00446ae9f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
      >
        <div id="mc_embed_signup_scroll">
          <h2>¡Forma parte de la nueva generación de Sunshiners!</h2>
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
            <label htmlFor="mce-FNAME">
              Nombre <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              name="FNAME"
              className="required text"
              id="mce-FNAME"
              required
              defaultValue=""
            />
          </div>

          <div className="mc-field-group">
            <label htmlFor="mce-TELEFONO">
              Whatsapp <span className="asterisk">*</span>
            </label>
            <input
              type="number"
              name="TELEFONO"
              className="required number"
              id="mce-TELEFONO"
              required
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
                Por favor selecciona las formas en que quieras saber más de
                Nature&apos;s Sunshine:
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
                Puedes darte de baja en cualquier momento dando click en el link
                que se encuentra en el pie de nuestros emails. Para información
                sobre nuestra política de privacidad, visite nuestro sitio web.
              </p>
            </div>

            <div className="content__gdprLegal">
              <p className="fine muted">
                We use Mailchimp as our marketing platform. By clicking below to
                subscribe, you acknowledge that your information will be
                transferred to Mailchimp for processing.{" "}
                <a
                  href="https://mailchimp.com/legal/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
                &nbsp;about Mailchimp&apos;s privacy practices.
              </p>
            </div>
          </div>

          <div hidden>
            <input type="hidden" name="tags" value="12681438" />
          </div>

          <div id="mce-responses" className="clear">
            <div
              className="response"
              id="mce-error-response"
              style={{ display: "none" }}
            />
            <div
              className="response"
              id="mce-success-response"
              style={{ display: "none" }}
            />
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
  );
};
