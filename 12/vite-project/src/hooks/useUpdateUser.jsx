import { useState } from "react";

/**
 * Hook para actualizar usuarios
 * @returns {Object} Objeto con funciones y estados
 */
function useUpdateUser() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);
    const baseUrl = "http://localhost:3000/api/user/updateUser";

    const updateUser = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const res = await response.json();
                console.log(res);
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

    return { updateUser, done, error, loading };
}

export default useUpdateUser;
