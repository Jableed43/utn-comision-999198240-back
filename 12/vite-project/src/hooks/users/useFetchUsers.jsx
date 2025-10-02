import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../../config/api.js";

/**
 * Hook para obtener la lista de usuarios
 * @returns {Object} Objeto con funciones y estados
 */
function useFetchUsers() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const initialUrl = buildApiUrl(API_CONFIG.USER.GET_ALL);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(initialUrl);

            if (response.ok) {
                const users = await response.json();
                console.log(users);
                setDone(true);
                return users;
            } else if (response.status === 204) {
                // No hay usuarios en la base de datos
                console.log('No hay usuarios en la base de datos');
                setDone(true);
                return [];
            } else {
                throw new Error(`Error en la respuesta de la api: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error.message);
            setError(error);
            setDone(true);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { fetchUsers, error, loading, done };
}

export default useFetchUsers;
