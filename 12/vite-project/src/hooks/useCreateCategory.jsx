import { useState } from "react";

/**
 * Hook para crear categorías
 * @returns {Object} Objeto con funciones y estados
 */
function useCreateCategory() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);
    const initialUrl = "http://localhost:3000/api/category/create";

    const createCategory = async (formData) => {
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

    return { createCategory, done, error, loading };
}

export default useCreateCategory;

