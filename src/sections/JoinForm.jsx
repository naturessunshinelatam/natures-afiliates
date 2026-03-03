import { useState } from "react";

export const JoinForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    pais: "",
    apellido: "",
    nombre: "",
    telefono: "",
    gdprConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    // Accepts numbers, spaces, +, -, and parentheses
    const re = /^[\d\s+\-()]+$/;
    return !phone || re.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email is required and must be valid
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // Phone validation (optional but must be valid format if provided)
    if (formData.telefono && !validatePhone(formData.telefono)) {
      newErrors.telefono = "El teléfono solo puede contener números";
    }

    // GDPR consent is required
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = "Debes aceptar recibir comunicaciones por email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For the gdpr checkbox, we need to handle it specially
    if (name === "gdpr[90974]") {
      setFormData((prev) => ({
        ...prev,
        gdprConsent: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name] || (name === "gdpr[90974]" && errors.gdprConsent)) {
      setErrors((prev) => ({ ...prev, [name]: null, gdprConsent: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset status
    setSubmitStatus(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for Mailchimp
      const formElement = e.target;
      const formDataToSend = new FormData(formElement);

      // Submit to Mailchimp
      const response = await fetch(formElement.action, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors", // Mailchimp doesn't support CORS, so we use no-cors
      });

      // Since we're using no-cors, we won't get a readable response
      // We'll assume success if no error was thrown
      setSubmitStatus("success");

      // Reset form
      setFormData({
        email: "",
        pais: "",
        apellido: "",
        nombre: "",
        telefono: "",
        gdprConsent: false,
      });

      // Show success message
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="mc_embed_signup" className="mc">
      <form
        action="https://naturessunshinelatam.us12.list-manage.com/subscribe/post?u=98c81c00200b439824130a329&amp;id=c0296ad042&amp;f_id=005c6ae9f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        onSubmit={handleSubmit}
        noValidate
      >
        <div id="mc_embed_signup_scroll">
          <h2>Suscríbete</h2>
          <div className="indicates-required">
            <span className="asterisk">*</span> indica requerido
          </div>

          {/* Email Field */}
          <div className="mc-field-group">
            <label htmlFor="mce-EMAIL">
              Dirección de correo electrónico{" "}
              <span className="asterisk">*</span>
            </label>
            <input
              type="email"
              name="EMAIL"
              className={`required email ${errors.email ? "error" : ""}`}
              id="mce-EMAIL"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          {/* Country Field */}
          <div className="mc-field-group">
            <label htmlFor="mce-PAIS">País</label>
            <select
              name="PAIS"
              id="mce-PAIS"
              value={formData.pais}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Mexico">Mexico</option>
              <option value="Colombia">Colombia</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Honduras">Honduras</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Republica Dominicana">Republica Dominicana</option>
              <option value="Panama">Panama</option>
              <option value="Guatemala">Guatemala</option>
            </select>
          </div>

          {/* Last Name Field */}
          <div className="mc-field-group">
            <label htmlFor="mce-LNAME">Apellido</label>
            <input
              type="text"
              name="LNAME"
              className="text"
              id="mce-LNAME"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>

          {/* First Name Field */}
          <div className="mc-field-group">
            <label htmlFor="mce-FNAME">Nombre</label>
            <input
              type="text"
              name="FNAME"
              className="text"
              id="mce-FNAME"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          {/* Phone Field */}
          <div className="mc-field-group">
            <label htmlFor="mce-TELEFONO">Teléfono</label>
            <input
              type="text"
              name="TELEFONO"
              className={`text ${errors.telefono ? "error" : ""}`}
              id="mce-TELEFONO"
              value={formData.telefono}
              onChange={handleChange}
              aria-invalid={errors.telefono ? "true" : "false"}
              aria-describedby={errors.telefono ? "phone-error" : undefined}
            />
            {errors.telefono && (
              <span id="phone-error" className="error-message">
                {errors.telefono}
              </span>
            )}
          </div>

          {/* GDPR Section */}
          <div
            id="mergeRow-gdpr"
            className="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group"
          >
            <div className="content__gdpr">
              <label>Permisos de Marketing</label>
              <p>Por favor selecciona las formas en que quieras saber más:</p>
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
                    checked={formData.gdprConsent}
                    onChange={handleChange}
                  />
                  <span>Email</span>
                </label>
              </fieldset>
              {errors.gdprConsent && (
                <span className="error-message">{errors.gdprConsent}</span>
              )}
              <p className="fine muted">
                Puedes darte de baja en cualquier momento desde el enlace en el
                pie de nuestros correos.
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
                  rel="noreferrer"
                >
                  Learn more
                </a>
                .
              </p>
            </div>
          </div>

          {/* Response Messages */}
          <div id="mce-responses" className="clear">
            {submitStatus === "success" && (
              <div className="response success-message" role="alert">
                ¡Gracias! Te has suscrito exitosamente.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="response error-message" role="alert">
                Hubo un error al enviar el formulario. Por favor intenta de
                nuevo.
              </div>
            )}
          </div>

          {/* Honeypot */}
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

          {/* Submit Button */}
          <div className="clear">
            <input
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button"
              value={isSubmitting ? "Enviando..." : "Afiliarme"}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
