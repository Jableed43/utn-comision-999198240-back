import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../config/api.js";

/**
 * Hook personalizado para enviar consultas de contacto
 * Maneja el estado de carga, errores y éxito del envío
 */
function useSendContact() {
    const [error, setError] = useState(null);
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendContact = async (contactData) => {
        setLoading(true);
        setError(null);
        setDone(false);
        
        try {
            const response = await fetch(buildApiUrl(API_CONFIG.EMAIL.CONTACT), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData)
            });

            const data = await response.json();

            if (response.ok) {
                setDone(true);
                return data;
            } else {
                setError(data.message || "Error al enviar el mensaje");
                setDone(false);
                throw new Error(data.message || "Error al enviar el mensaje");
            }
        } catch (error) {
            const errorMessage = error.message || "Error de conexión. Por favor, intente nuevamente.";
            setError(errorMessage);
            setDone(false);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { sendContact, done, error, loading };
}

export default useSendContact;

