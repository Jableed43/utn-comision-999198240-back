import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../../config/api.js";

/**
 * Hook para autenticación de usuarios
 * @returns {Object} Objeto con funciones y estados
 */
function useLoginUser() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);
    const initialUrl = buildApiUrl(API_CONFIG.USER.LOGIN);

    const loginUser = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(initialUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const res = await response.json();
                // Guardar token en sessionStorage
                sessionStorage.setItem("token", res.token);
                setDone(true);
                return res;
            } else {
                setError(response.statusText);
                setDone(false);
            }
        } catch (error) {
            console.error(error);
            setError(error);
            setDone(false);
        } finally {
            setLoading(false);
        }
    };

    return { done, error, loginUser, loading };
}

export default useLoginUser;