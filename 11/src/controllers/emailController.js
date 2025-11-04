import { sendContactEmail } from "../services/emailService.js";

/**
 * Controlador para manejar el envío de emails de contacto
 * Recibe los datos del formulario y los procesa a través del servicio
 */
export const sendContact = async (req, res) => {
    try {
        const contactData = req.body;
        
        // Validación básica de que existan datos
        if (!contactData || Object.keys(contactData).length === 0) {
            return res.status(400).json({ 
                message: "No se recibieron datos del formulario" 
            });
        }

        const result = await sendContactEmail(contactData);
        
        return res.status(200).json(result);
    } catch (error) {
        // Manejo de errores con códigos de estado apropiados
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ 
            message: error.message || "Error interno del servidor"
        });
    }
};

