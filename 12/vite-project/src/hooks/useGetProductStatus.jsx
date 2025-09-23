import { useState } from "react";

/**
 * Hook para obtener el estado de productos
 * @returns {Object} Objeto con funciones y estados
 */
function useGetProductStatus() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const initialUrl = "http://localhost:3000/api/product/status";

    const getProductStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(initialUrl);

            if (response.ok) {
                const status = await response.json();
                console.log(status);
                setDone(true);
                return status;
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

    return { getProductStatus, error, loading, done };
}

export default useGetProductStatus;

