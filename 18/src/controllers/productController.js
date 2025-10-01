import { getCategoriesService } from "../services/categoryService.js"
import { createProductService, deleteProductService, findProductByIdService, findProductByNameService, getProductsService, getStatusService, updateProductService } from "../services/productService.js"

export const createProduct = async (req, res) => {
    try {
        await createProductService(req.body)
        req.session.message = "Producto creado exitosamente"
        res.redirect("/product/")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/product/create")
    }
}

export const createProductView = async (req, res) => {
    try {
        const categories = await getCategoriesService()

        res.render("product/createProduct", {
            title: "Crear producto",
            categories: categories,
            message: req.session.message || null
        })
    } catch (error) {
        res.render("product/createProduct", {
            title: "Crear producto",
            categories: [],
            message: "Error al crear productos"
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService()
        /* con render renderizamos un archivo, que seria una view */
        return res.render("product/getAllProducts", {  products, title: "Productos" })
    } catch (error) {
        return res.status(500).render("500", { message: error })
    }
}

export const findProductByName = async (req, res) => {
    try {
        const product = await findProductByNameService(req.body.name)
        return res.status(200).json(product)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const findProductById = async (req, res) => {
    try {
        const product = await findProductByIdService(req.params.id)
        return res.status(200).json(product)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const updateProductView = async (req, res) => {
    try {
        const productId = req.params.id

        // Hacemos un doble llamado para traer los productos y las categorias
        const [product, categories] = await Promise.all([
            getProductsService().then(products => products.find(p => p._id.toString() === productId )),
            getCategoriesService()
        ])

        if(!product){
            req.session.message = "Producto no encontrado"
            return res.redirect("/product/")
        }
            // Redirect redirecciona a una ruta de nuestra aplicacion
            res.render("product/updateProduct", {
                title: "Editar producto",
                product: product,
                categories: categories,
                message: req.session.message || null
            })

        // Renderizacion de la vista de edicion de productos

    } catch (error) {
        req.session.message = "Error al cargar producto"
        res.redirect("/product/")
    }
}
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product  = await updateProductService(productId, req.body)
        console.log(product)
        // Mostramos el mensaje con exito
        req.session.message = "Producto actualizado correctamente";
        res.redirect("/product/")

    } catch (error) {
        req.session.message = error.message
        res.redirect(`/product/update/${req.params.id}`)
}
}


export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await deleteProductService(productId)
        req.session.message = "Producto eliminado exitosamente"
        res.redirect("/product/")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/product/")
    }
}

export const getStatus = async (req, res) => {
    try {
        const status = await getStatusService()
        return res.status(200).json(status)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}