import { useState } from "react";
import useSendContact from "../hooks/email/useSendContact";

const ContactForm = () => {
  const { sendContact, error, done, loading } = useSendContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactMethod: "email",
  });

  const contactMethods = [
    { value: "email", label: "✉️ Email" },
    { value: "phone", label: "📞 Teléfono" },
    { value: "whatsapp", label: "💬 Whatsapp" },
    { value: "any", label: "🌟 Cualquiera" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContact(formData);

      // resetear el formulario

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        contactMethod: "email",
      });
    } catch (error) {
        console.error("Error al enviar contacto", err)
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2> Formulario de consulta </h2>
        <p> Complete el formulario y nos pondremos en contacto contigo </p>
      </div>

      {done && (
        <div>👌 Mensaje enviado exitosamente, te contactaremos pronto</div>
      )}

      {error && <div className="error-message">❗{error}</div>}

      <form onSubmit={handleSubmit} className="simple-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              required
              disabled={loading}
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              required
              disabled={loading}
              placeholder="Ingresa tu email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono (Opcional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              disabled={loading}
              placeholder="Ingresa tu Teléfono"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactMethod">Método de contacto preferido</label>
            <select
              name="contactMethod"
              id="contactMethod"
              value={formData.contactMethod}
              disabled={loading}
              onChange={handleChange}
            >
              {contactMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              disabled={loading}
              placeholder="Ingresa el asunto"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              disabled={loading}
              placeholder="Ingresa el mensaje"
              onChange={handleChange}
              rows="6"
              required
            />

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {" "}
                {loading
                  ? "Enviando"
                  : done
                  ? "Enviado"
                  : "Enviar consulta"}{" "}
              </button>
              {done && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="btn btn-secondary"
                >
                  {" "}
                  Enviar otra consulta{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
