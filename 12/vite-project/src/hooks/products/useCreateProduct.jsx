import { useState } from "react";
import { buildApiUrl, API_CONFIG } from "../../config/api.js";

function useCreateProduct() {
    const [ error, setError ] = useState()
    const [ done, setDone ] = useState()
    const [ loading, setLoading ] = useState(false)
    const initialUrl = buildApiUrl(API_CONFIG.PRODUCT.CREATE)

    const createProduct = async (formData) => {
        setLoading(true)
        setError(null)

        try {
           const response = await fetch(initialUrl, {
                method: "POST",
                // La informacion enviada es un json
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            })

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
    return {createProduct, done, error, loading}

}

export default useCreateProduct;

