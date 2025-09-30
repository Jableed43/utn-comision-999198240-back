import { createUserService, deleteUserService, getUsersService, updateUserService, validateUserService } from "../services/userService.js"

// ===== VISTAS =====

// Vista de registro
export const createUserView = (req, res) => {
    res.render("user/createUser", { 
        title: "Registrar Usuario",
        message: req.session.message || null
    })
}

// Vista de login
export const loginView = (req, res) => {
    res.render("user/login", { 
        title: "Iniciar Sesión",
        message: req.session.message || null
    })
}

// Vista de lista de usuarios
export const getAllUsersView = async (req, res) => {
    try {
        const users = await getUsersService()
        res.render("user/getAllUsers", { 
            title: "Lista de Usuarios",
            users: users,
            message: req.session.message || null
        })
    } catch (error) {
        res.render("user/getAllUsers", { 
            title: "Lista de Usuarios",
            users: [],
            message: "No hay usuarios registrados"
        })
    }
}

// Vista de editar usuario
export const updateUserView = async (req, res) => {
    try {
        const userId = req.params.id
        const users = await getUsersService()
        const user = users.find(u => u._id.toString() === userId)
        
        if (!user) {
            req.session.message = "Usuario no encontrado"
            return res.redirect("/user/getAll")
        }
        
        res.render("user/updateUser", { 
            title: "Editar Usuario",
            user: user,
            message: req.session.message || null
        })
    } catch (error) {
        req.session.message = "Error al cargar usuario"
        res.redirect("/user/getAll")
    }
}

// ===== ACCIONES =====

// Crear usuario
export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body)
        req.session.message = "Usuario creado exitosamente"
        res.redirect("/user/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/user/create")
    }
}

// Autenticación
export const validate = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await validateUserService(email, password)
        
        // Guardar token en sesión
        req.session.token = result.token
        req.session.userId = result.userId
        req.session.userEmail = result.userEmail
        
        req.session.message = "Inicio de sesión exitoso"
        res.redirect("/user/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/user/login")
    }
}

// Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const updatedUser = await updateUserService(userId, req.body)
        req.session.message = "Usuario actualizado exitosamente"
        res.redirect("/user/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect(`/user/update/${req.params.id}`)
    }
}

// Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        await deleteUserService(userId)
        req.session.message = "Usuario eliminado exitosamente"
        res.redirect("/user/getAll")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/user/getAll")
    }
}

// Cerrar sesión
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/")
    })
}