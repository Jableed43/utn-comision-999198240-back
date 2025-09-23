import { useState } from "react";

function useFetchProducts() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/api/product");

            if (response.status === 204) {
                // No hay productos - devolver array vacío
                setDone(true);
                return [];
            } else if (response.ok) {
                const products = await response.json();
                setDone(true);
                return products;
            } else {
                const errorData = await response.json();
                // Si el error es "There are no products", devolver array vacío
                if (errorData.error && errorData.error.includes("There are no products")) {
                    setDone(true);
                    return [];
                } else {
                    throw new Error(`Error: ${response.statusText} - ${errorData.message || errorData.error}`);
                }
            }
        } catch (error) {
            setError(error);
            setDone(true);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { fetchProducts, error, loading, done };
}

export default useFetchProducts;
