import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../../config/api.js";

function useFetchCategories() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(buildApiUrl(API_CONFIG.CATEGORY.GET_ALL));

            if (response.status === 204) {
                // No hay categorías - devolver array vacío
                setDone(true);
                return [];
            } else if (response.ok) {
                const categories = await response.json();
                setDone(true);
                return categories;
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            setError(error);
            setDone(true);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { fetchCategories, error, loading, done };
}

export default useFetchCategories;
