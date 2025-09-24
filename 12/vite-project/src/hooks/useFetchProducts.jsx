import { useState } from "react";

/**
 * Hook para obtener la lista de productos
 * @returns {Object} Objeto con funciones y estados
 */
function useFetchProducts() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const initialUrl = "http://localhost:3000/api/product";

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(initialUrl);

            if (response.ok) {
                const products = await response.json();
                console.log(products);
                setDone(true);
                return products;
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

    return { fetchProducts, error, loading, done };
}

export default useFetchProducts;
