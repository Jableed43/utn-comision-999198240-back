import React, { useState } from 'react';
import useSendContact from '../hooks/useSendContact';

/**
 * Componente de formulario de contacto
 * Permite a los usuarios enviar consultas con diferentes métodos de contacto
 */
const ContactForm = () => {
    const { sendContact, done, error, loading } = useSendContact();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactMethod: 'email'
    });

    const contactMethods = [
        { value: 'email', label: '📧 Email' },
        { value: 'phone', label: '📞 Teléfono' },
        { value: 'whatsapp', label: '💬 WhatsApp' },
        { value: 'any', label: '☎️ Cualquiera' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await sendContact(formData);
            // Resetear el formulario después de enviar exitosamente
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                contactMethod: 'email'
            });
        } catch (err) {
            // El error ya está manejado en el hook
            console.error('Error al enviar contacto:', err);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Formulario de Consulta</h2>
                <p>Completa el formulario y nos pondremos en contacto contigo</p>
            </div>

            {done && (
                <div style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '1rem',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    border: '1px solid #c3e6cb'
                }}>
                    ✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </div>
            )}

            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="simple-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">
                            Nombre completo <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Ingresa tu nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="tu@email.com"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono (opcional)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="+54 9 11 1234-5678"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactMethod">
                            Método de contacto preferido
                        </label>
                        <select
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            {contactMethods.map(method => (
                                <option key={method.value} value={method.value}>
                                    {method.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">
                        Asunto <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Ej: Consulta sobre productos, Soporte técnico, etc."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">
                        Mensaje <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        rows="6"
                        placeholder="Escribe tu mensaje aquí..."
                        style={{
                            padding: '0.75rem',
                            border: '1px solid #ced4da',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                            minHeight: '120px'
                        }}
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={loading || done} 
                        className="btn btn-primary"
                    >
                        {loading ? 'Enviando...' : done ? 'Enviado ✓' : 'Enviar Consulta'}
                    </button>
                    {done && (
                        <button 
                            type="button" 
                            onClick={() => window.location.reload()} 
                            className="btn btn-secondary"
                        >
                            Enviar otra consulta
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ContactForm;

