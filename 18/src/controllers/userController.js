import { createUserService, deleteUserService, getUsersService, updateUserService, validateUserService } from "../services/userService.js"

// Controladores: Actuan como intermediario entre cliente y la logica de la aplicacion. Recibe solicitudes las procesa y responde
// Estos controladores incluyen a los servicios

// CRUD

// CREAR CAPA DE SERVICIOS

// Crear usuario
export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body)
        res.status(201).json(response)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
       const users = await getUsersService()
       // 200 significa que la operacion fue exitosa
       res.status(200).json(users)
    } catch (error) {
        console.log({error})
        // 204 significa no content
        if(error.statusCode === 204){
            return res.sendStatus(error.statusCode)
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// Borrar el usuario
export const deleteUser = async (req, res) => {
    try {
        // Obtenemos x el path param el id
        // api/user/delete/:id
        const userId = req.params.id
        const result = await deleteUserService(userId)
        return res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 404){
            return res.status(error.statusCode).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// Actualizamos usuario
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id 
        // Siempre que editamos necesitamos el id y los nuevos datos
       const updatedUser = await updateUserService(userId, req.body)
       console.log(updatedUser, "desde el controller")
       return res.status(201).json(updatedUser)
    } catch (error) {
        if(error.statusCode === 404){
            return res.status(404).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// Autenticar/validar al usuario
export const validate = async (req, res) => {
    try {
    // Deberiamos tomar los datos que nos mandan en el req
    const { email, password } = req.body;
    const result = await validateUserService(email, password)
    console.log({result})
        return res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(error.statusCode).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}
