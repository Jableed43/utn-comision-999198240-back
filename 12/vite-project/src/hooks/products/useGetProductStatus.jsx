import { useState } from "react";

function useGetProductStatus() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const getProductStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/api/product/status");

            if (response.ok) {
                const statusList = await response.json();
                return statusList;
            } else {
                const errorText = await response.text();
                throw new Error(`Error: ${response.statusText} - ${errorText}`);
            }
        } catch (error) {
            setError(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { getProductStatus, error, loading };
}

export default useGetProductStatus;
