import { useState } from "react";

/**
 * Hook para obtener la lista de categorías
 * @returns {Object} Objeto con funciones y estados
 */
function useFetchCategories() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const initialUrl = "http://localhost:3000/api/category/getCategories";

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(initialUrl);

            if (response.ok) {
                const categories = await response.json();
                console.log(categories);
                setDone(true);
                return categories;
            } else {
                throw new Error(`Error en la respuesta de la api: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error.message);
            setError(error);
            setDone(true);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchCategories, error, loading, done };
}

export default useFetchCategories;
