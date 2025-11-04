import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS, EMAIL_FROM } from '../../config.js';

// Configuración del transporte de email
// Usa credenciales SMTP para enviar emails
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // Esto es más simple y confiable para Gmail
        auth: {
            user: EMAIL_USER.trim(), // .trim() elimina espacios
            pass: EMAIL_PASS.trim()
        }
    });
};

/**
 * Servicio para enviar email de consulta
 * @param {Object} contactData - Datos del formulario de contacto
 * @param {string} contactData.name - Nombre del remitente
 * @param {string} contactData.email - Email del remitente
 * @param {string} contactData.phone - Teléfono del remitente (opcional)
 * @param {string} contactData.subject - Asunto del mensaje
 * @param {string} contactData.message - Mensaje del contacto
 * @param {string} contactData.contactMethod - Método de contacto preferido
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendContactEmail = async (contactData) => {
    const { name, email, phone, subject, message, contactMethod } = contactData;

    // Validación de campos requeridos
    if (!name || !email || !subject || !message) {
        const error = new Error("Todos los campos requeridos deben estar completos");
        error.statusCode = 400;
        throw error;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const error = new Error("El formato del email no es válido");
        error.statusCode = 400;
        throw error;
    }

    try {
        const transporter = createTransporter();

        // Configuración del email
        const mailOptions = {
            from: EMAIL_FROM || EMAIL_USER,
            to: EMAIL_USER, // Email donde se recibirán las consultas
            replyTo: email, // Email del remitente para responder
            subject: `Consulta: ${subject}`,
            html: `
                <h2>Nueva Consulta de Contacto</h2>
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
                    <p><strong>Método de contacto preferido:</strong> ${contactMethod || 'Email'}</p>
                    <p><strong>Asunto:</strong> ${subject}</p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                    <p><strong>Mensaje:</strong></p>
                    <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
                </div>
            `,
            text: `
                Nueva Consulta de Contacto
                
                Nombre: ${name}
                Email: ${email}
                ${phone ? `Teléfono: ${phone}` : ''}
                Método de contacto preferido: ${contactMethod || 'Email'}
                Asunto: ${subject}
                
                Mensaje:
                ${message}
            `
        };

        // Enviar el email
        const info = await transporter.sendMail(mailOptions);

        return {
            message: "Email enviado exitosamente",
            messageId: info.messageId
        };
    } catch (error) {
        console.error("Error al enviar email:", error);
        const errorMessage = new Error("Error al enviar el email. Por favor, intente nuevamente más tarde.");
        errorMessage.statusCode = 500;
        throw errorMessage;
    }
};

