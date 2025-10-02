import { useState } from "react";

function useDeleteUser() {
    const [error, setError] = useState();
    const [done, setDone] = useState();
    const [loading, setLoading] = useState(false);

    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/api/user/deleteUser/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
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

    return { deleteUser, done, error, loading };
}

export default useDeleteUser;
