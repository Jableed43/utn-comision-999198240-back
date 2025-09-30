import { useState } from "react"

function useUpdateUser() {
    const [ error, setError ] = useState()
    const [ done, setDone ] = useState()
    const [ loading, setLoading ] = useState(false)
    const initialUrl = "http://localhost:3000/api/user/updateUser"

    const updateUser = async(id, formData) => {
        setLoading(true);
        setError(null)
        try {
            const response = await fetch(`${initialUrl}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if(response.ok){
               const res = await response.json()
                setDone(true)
                return res
            } else {
                // Error de servidor
                setError(response.statusText)
                setDone(false)
            }
        } catch (error) {
            setError(error)
            setDone(false)
        } finally {
            setLoading(false)
        }
    }
    return { updateUser, done, error, loading }
}

export default useUpdateUser

