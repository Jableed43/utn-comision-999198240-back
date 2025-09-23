import { useState } from "react";

/**
 * Hook para actualizar productos
 * @returns {Object} Objeto con funciones y estados
 */
function useUpdateProduct() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);
    const baseUrl = "http://localhost:3000/api/product/update";

    const updateProduct = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
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

    return { updateProduct, done, error, loading };
}

export default useUpdateProduct;
