import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../config/api.js";

/**
 * Hook para buscar producto por nombre
 * @returns {Object} Objeto con funciones y estados
 */
function useFindProductByName() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const initialUrl = buildApiUrl(API_CONFIG.PRODUCT.FIND_BY_NAME);

    const findProductByName = async (name) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(initialUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name })
            });

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

    return { findProductByName, error, loading, done };
}

export default useFindProductByName;

