import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../../config/api.js";

function useGetProductStatus() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const getProductStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(buildApiUrl(API_CONFIG.PRODUCT.STATUS));

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

