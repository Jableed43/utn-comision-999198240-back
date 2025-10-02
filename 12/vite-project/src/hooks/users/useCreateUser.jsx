import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../../config/api.js";

function useCreateUser() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);

    const createUser = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(buildApiUrl(API_CONFIG.USER.CREATE), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const res = await response.json();
                setDone(true);
                return res;
            } else {
                setError(response.statusText);
                setDone(false);
            }
        } catch (error) {
            setError(error);
            setDone(false);
        } finally {
            setLoading(false);
        }
    };

    return { createUser, done, error, loading };
}

export default useCreateUser;

