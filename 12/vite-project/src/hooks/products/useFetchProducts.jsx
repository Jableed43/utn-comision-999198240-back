import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../../config/api.js";

function useFetchProducts() {
    const [ error, setError ] = useState()
    const [ done, setDone ] = useState()
    const [ loading, setLoading ] = useState(false)
    const initialUrl = buildApiUrl(API_CONFIG.PRODUCT.GET_ALL)

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
