import { useState } from "react";

function useRegisterUser() {
    const [ error, setError ] = useState()
    const [ done, setDone ] = useState()
    const initialUrl = "http://localhost:3000/api/user/create"

    const registerUser = async (formData) => {
        try {
            const response = await fetch(initialUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if(response.ok){
                const res = await response.json()
                console.log(res)
                setDone(true)
            } else {
                setError(response.statusText)
                setDone(false)
            }
        } catch (error) {
            console.error(error)
            setError(error)
            setDone(false)
        }
    }
    return { registerUser, done, error }
}

export default useRegisterUser;