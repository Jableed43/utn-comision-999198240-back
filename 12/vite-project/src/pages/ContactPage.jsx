import React from 'react';
import ContactForm from '../components/ContactForm';

/**
 * Página de contacto
 * Contiene el formulario de consulta y información adicional
 */
const ContactPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>📧 Contacto</h1>
                    <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
                </div>
            </div>

            <div className="page-content">
                <div style={{ 
                    marginBottom: '2rem', 
                    padding: '1.5rem', 
                    backgroundColor: '#e7f3ff', 
                    borderRadius: '8px',
                    border: '1px solid #b3d9ff'
                }}>
                    <h3 style={{ marginBottom: '1rem', color: '#004085' }}>
                        Información de Contacto
                    </h3>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '1rem',
                        color: '#004085'
                    }}>
                        <div>
                            <strong>📧 Email:</strong>
                            <p>contacto@ejemplo.com</p>
                        </div>
                        <div>
                            <strong>📞 Teléfono:</strong>
                            <p>+54 11 1234-5678</p>
                        </div>
                        <div>
                            <strong>🕒 Horario:</strong>
                            <p>Lun - Vie: 9:00 - 18:00</p>
                        </div>
                    </div>
                </div>

                <ContactForm />
            </div>
        </div>
    );
};

export default ContactPage;

