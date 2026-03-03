import { useState } from "react";
import { StarRating } from "../ui/StarRating";

export const TestimonialForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    text: "",
    rating: 0,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.text ||
      formData.rating === 0
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Mock: in production this would POST to API
    console.log("Nuevo testimonio pendiente de revisión:", {
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    alert("¡Gracias! Tu testimonio ha sido enviado para revisión.");
    setFormData({ name: "", role: "", email: "", text: "", rating: 0 });
    setShowForm(false);
  };

  return (
    <div className="testimonial__submit">
      {!showForm ? (
        <button
          className="btn testimonial__ctaSubmit"
          onClick={() => setShowForm(true)}
        >
          Comparte tu testimonio
        </button>
      ) : (
        <div className="testimonial__form">
          <h3>Cuéntanos tu experiencia</h3>
          <p className="muted fine">
            Tu comentario será revisado antes de publicarse.
          </p>

          <form onSubmit={handleSubmitTestimonial}>
            <div className="form__group">
              <label htmlFor="name">Nombre *</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form__row">
              <div className="form__group">
                <label htmlFor="role">Rol (opcional)</label>
                <input
                  id="role"
                  type="text"
                  name="role"
                  placeholder="ej: Consultora, Líder"
                  value={formData.role}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="form__group">
              <label>Calificación *</label>
              <div className="form__rating">
                <StarRating
                  rating={formData.rating}
                  readOnly={false}
                  onRate={(r) =>
                    setFormData((prev) => ({ ...prev, rating: r }))
                  }
                  size="lg"
                  showLabel
                />
              </div>
            </div>

            <div className="form__group">
              <label htmlFor="text">Tu testimonio *</label>
              <textarea
                id="text"
                name="text"
                placeholder="Cuéntanos tu experiencia con Natures y NSP..."
                value={formData.text}
                onChange={handleFormChange}
                rows={4}
                required
              />
            </div>

            <div className="form__actions">
              <button type="submit" className="btn">
                Enviar testimonio
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
