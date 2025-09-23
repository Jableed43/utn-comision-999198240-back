import { useState } from "react";

function useCreateCategory() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);

    const createCategory = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/api/category/create", {
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

    return { createCategory, done, error, loading };
}

export default useCreateCategory;

