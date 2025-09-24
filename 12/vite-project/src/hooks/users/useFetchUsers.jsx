import { useState } from "react";

function useFetchUsers() {
    const [ error, setError ] = useState()
    // loading
    const [ loading, setLoading ] = useState(false)
    const [ done, setDone ] = useState(false)
    const initialUrl = "http://localhost:3000/api/user/getUsers"

    const fetchUsers = async () => {
        setLoading(true)
        try {
           const response = await fetch(initialUrl)

            if(response.ok){
                const users = await response.json()
                console.log(users)
                // Sirve para confirmar la finalizacion de la operacion
                setDone(true)
                return users
            } else {
                // Este manejo de error es respecto a la API
                throw new Error(`Error en la respuesta de la api: ${response.statusText}`)
            }
        } catch (error) {
            // Este manejo de error es respecto al front
            console.error(error.message)
            setError(error)
            setDone(true)
            return null
        } finally {
            setLoading(false)
        }
    }
    return { fetchUsers, error, loading, done } 
}

export default useFetchUsers;
