import { useState } from "react"


function useLoginUser() {
    const [ error, setError ] = useState()
    const [done, setDone] = useState()
    const initialUrl = "http://localhost:3000/api/user/login"

    const loginUser = async (formData) => {
        try {
           const response = await fetch(initialUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if(response.ok){
               const res = await response.json()
               // Recibimos el token y lo guardamos en una key llamada token
               // Dentro del sessionStorage
               // setItem -> crea y guarda el valor
               sessionStorage.setItem("token", res.token)
            setDone(true)
            } else {
                setError(error)
                setDone(false)
            }
        } catch (error) {
            console.error(error)
            setError(error)
            setDone(false)
        }
    }
    return { done, error, loginUser }
}

export default useLoginUser;