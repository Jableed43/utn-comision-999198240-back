// ===== CONTROLADOR DE USUARIOS =====
// Este archivo maneja todas las operaciones relacionadas con usuarios
// Sigue el patrón MVC: recibe requests, llama a servicios, renderiza vistas

import { createUserService, deleteUserService, getUsersService, updateUserService, validateUserService } from "../services/userService.js"

// ===== VISTAS (Lo que ve el usuario) =====

// Vista para mostrar el formulario de registro
export const createUserView = (req, res) => {
    // Renderizamos la vista con el formulario de creación
    // Pasamos el título y cualquier mensaje de la sesión
    res.render("user/createUser", { 
        title: "Registrar Usuario",
        message: req.session.message || null
    })
}

// Vista para mostrar el formulario de login
export const loginView = (req, res) => {
    // Renderizamos la vista de login con título y mensajes
    res.render("user/login", { 
        title: "Iniciar Sesión",
        message: req.session.message || null
    })
}

// Vista para mostrar la lista de todos los usuarios
export const getAllUsersView = async (req, res) => {
    try {
        // Llamamos al servicio para obtener todos los usuarios
        const users = await getUsersService()
        
        // Renderizamos la vista con la lista de usuarios
        res.render("user/getAllUsers", { 
            title: "Lista de Usuarios",
            users: users,
            message: req.session.message || null
        })
    } catch (error) {
        // Si hay error, mostramos lista vacía con mensaje de error
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

// Función para crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        // Llamamos al servicio para crear el usuario con los datos del formulario
        const response = await createUserService(req.body)
        
        // Guardamos mensaje de éxito en la sesión
        req.session.message = "Usuario creado exitosamente"
        
        // Redirigimos a la lista de usuarios
        res.redirect("/user/getAll")
    } catch (error) {
        // Si hay error, guardamos el mensaje y redirigimos al formulario
        req.session.message = error.message
        res.redirect("/user/create")
    }
}

// Función para autenticar (login) un usuario
export const validate = async (req, res) => {
    try {
        // Extraemos email y password del formulario
        const { email, password } = req.body
        
        // Llamamos al servicio para validar las credenciales
        const result = await validateUserService(email, password)
        
        // Si la validación es exitosa, guardamos información en la sesión
        req.session.token = result.token
        req.session.userId = result.userId
        req.session.userEmail = result.userEmail
        req.session.userName = result.userName
        
        // Mostramos mensaje de bienvenida y redirigimos al home
        req.session.message = `¡Bienvenido/a ${result.userName}!`
        res.redirect("/")
    } catch (error) {
        // Si hay error, mostramos el mensaje y volvemos al login
        req.session.message = error.message
        res.redirect("/user/login")
    }
}

// Función para actualizar un usuario existente
export const updateUser = async (req, res) => {
    try {
        // Obtenemos el ID del usuario desde la URL
        const userId = req.params.id
        
        // Llamamos al servicio para actualizar el usuario
        const updatedUser = await updateUserService(userId, req.body)
        
        // Mostramos mensaje de éxito y redirigimos
        req.session.message = "Usuario actualizado exitosamente"
        res.redirect("/user/getAll")
    } catch (error) {
        // Si hay error, mostramos el mensaje y volvemos al formulario
        req.session.message = error.message
        res.redirect(`/user/update/${req.params.id}`)
    }
}

// Función para eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        // Obtenemos el ID del usuario desde la URL
        const userId = req.params.id
        
        // Llamamos al servicio para eliminar el usuario
        await deleteUserService(userId)
        
        // Mostramos mensaje de éxito y redirigimos
        req.session.message = "Usuario eliminado exitosamente"
        res.redirect("/user/getAll")
    } catch (error) {
        // Si hay error, mostramos el mensaje y volvemos a la lista
        req.session.message = error.message
        res.redirect("/user/getAll")
    }
}

// Función para cerrar sesión (logout)
export const logout = (req, res) => {
    // Destruimos la sesión del usuario
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        // Redirigimos al home después de cerrar sesión
        res.redirect("/")
    })
}