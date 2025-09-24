import { useState } from "react";

/**
 * Hook para eliminar usuarios
 * @returns {Object} Objeto con funciones y estados
 */
function useDeleteUser() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);
    const baseUrl = "http://localhost:3000/api/user/deleteUser";

    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
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

    return { deleteUser, done, error, loading };
}

export default useDeleteUser;
