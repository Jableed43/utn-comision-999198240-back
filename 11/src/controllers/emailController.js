import { sendContactEmail } from "../services/emailService.js";

export const sendContact = async (req, res) => {
    try {
        const contactData = req.body

        // Validacion basica de informacion de contacto o keys vacias
        if(!contactData || Object.keys(contactData).length === 0){
            return res.status(400).json({
                message: "No se recibieron datos del formulario"
            })
        }

        const result = await sendContactEmail(contactData)

        return res.status(200).json(result)

    } catch (error) {
        const statusCode = error.statusCode || 500
        return res.status(statusCode).json({
            message: error.message || "Error interno de servidor"
        })
    }
}