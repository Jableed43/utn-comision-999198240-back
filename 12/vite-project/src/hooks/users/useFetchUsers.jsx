import { useState } from "react";

function useFetchUsers() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/api/user/getUsers");

            if (response.status === 204) {
                // No hay usuarios - devolver array vacío
                setDone(true);
                return [];
            } else if (response.ok) {
                const users = await response.json();
                setDone(true);
                return users;
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            setError(error);
            setDone(true);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { fetchUsers, error, loading, done };
}

export default useFetchUsers;
