import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../config/api.js";

/**
 * Hook para buscar producto por ID
 * @returns {Object} Objeto con funciones y estados
 */
function useFindProductById() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const baseUrl = buildApiUrl(API_CONFIG.PRODUCT.FIND_BY_ID);

    const findProductById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl}/${id}`);

            if (response.ok) {
                const product = await response.json();
                console.log(product);
                setDone(true);
                return product;
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

    return { findProductById, error, loading, done };
}

export default useFindProductById;

