import { useState } from "react"

function useFetchProducts() {
    const [ error, setError ] = useState()
    const [ done, setDone ] = useState()
    const [ loading, setLoading ] = useState(false)
    const initialUrl = "http://localhost:3000/api/product/"

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)

        try {
           const response = await fetch(initialUrl)

            if(response.ok){
               const res = await response.json()
                setDone(true)
                return res
            }

        } catch (error) {
            setError(error)
            setDone(false)

        } finally { 
            setLoading(false)
        }
    }
    return {fetchProducts, done, error, loading}

}

export default useFetchProducts;
