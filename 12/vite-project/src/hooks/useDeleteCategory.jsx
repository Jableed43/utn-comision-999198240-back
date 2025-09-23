import { useState } from "react";

/**
 * Hook para eliminar categorías
 * @returns {Object} Objeto con funciones y estados
 */
function useDeleteCategory() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);
    const baseUrl = "http://localhost:3000/api/category/delete";

    const deleteCategory = async (id) => {
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

    return { deleteCategory, done, error, loading };
}

export default useDeleteCategory;
